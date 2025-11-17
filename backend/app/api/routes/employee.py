from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError
from app.crud import user as user_crud
from app.schemas.user import EmployeeProfileUpdate, UserResponse
from app.api.deps import get_db, get_current_user

router = APIRouter()

@router.get("/health-check")
def health_check():
    try:
        return {"status": "ok"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Health check failed: {str(e)}")

@router.put("/setup-profile", response_model=UserResponse)
def setup_profile(
    data: EmployeeProfileUpdate, 
    db: Session = Depends(get_db), 
    user=Depends(get_current_user)
):
    try:
        updated_user = user_crud.update_employee_profile(
            db, user, data.phone, data.address, data.blood_group
        )
        return updated_user

    except SQLAlchemyError as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Unexpected error: {str(e)}")

@router.get("/profile", response_model=UserResponse)
def get_profile(user=Depends(get_current_user)):
    try:
        return user
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Unexpected error: {str(e)}")
