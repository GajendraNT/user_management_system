from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError
from app.core.database import get_db
from app.core.security import get_password_hash, verify_password, create_access_token
from app.schemas.user import LoginRequest, PasswordSetupRequest
from app.crud.user import get_user_by_email
from app.api.deps import get_current_user

router = APIRouter()

@router.get("/health-check")
def health_check():
    try:
        return {"status": "ok"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Health check failed: {str(e)}")

@router.post("/login")
def login(data: LoginRequest, db: Session = Depends(get_db)):
    try:
        user = get_user_by_email(db, data.email)
        if not user or not verify_password(data.password, user.hashed_password):
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")

        access_token = create_access_token(data={"sub": user.email})
        return {"access_token": access_token, "user": user}

    except SQLAlchemyError as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Unexpected error: {str(e)}")

@router.get("/users/me")
def read_users_me(current_user: str = Depends(get_current_user)):
    try:
        return current_user
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Unexpected error: {str(e)}")

@router.put("/setup-password")
def setup_password(
    data: PasswordSetupRequest,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    try:
        if not current_user.first_login:
            raise HTTPException(status_code=400, detail="Password already set up")

        if data.new_password != data.confirm_password:
            raise HTTPException(status_code=400, detail="Passwords do not match")

        current_user.hashed_password = get_password_hash(data.new_password)
        current_user.first_login = False
        db.commit()

        db.expire_all()
        db.refresh(current_user)

        return {
            "message": "Password setup successful",
            "user": current_user
        }

    except SQLAlchemyError as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Unexpected error: {str(e)}")
