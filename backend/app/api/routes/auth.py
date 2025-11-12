from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.security import verify_password, create_access_token
from app.schemas.user import LoginRequest, TokenResponse
from app.crud.user import get_user_by_email
from app.api.deps import get_current_user

router = APIRouter()

@router.get("/health-check")
def health_check():
    return {"status": "ok"}

@router.post("/login")
def login(data: LoginRequest, db: Session = Depends(get_db)):
    user = get_user_by_email(db, data.email)
    if not user or not verify_password(data.password, user.hashed_password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")

    access_token = create_access_token(data={"sub": user.email})
    return {"access_token": access_token, "user": user}

@router.get("/users/me")
def read_users_me(current_user: str = Depends(get_current_user)):
    return current_user