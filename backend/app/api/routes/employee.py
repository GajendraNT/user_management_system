from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.crud import user as user_crud
from app.schemas.user import EmployeeProfileUpdate, UserResponse
from app.api.deps import get_db, get_current_user

router = APIRouter()

@router.get("/health-check")
def health_check():
    return {"status": "ok"}

@router.post("/setup-profile", response_model=UserResponse)
def setup_profile(data: EmployeeProfileUpdate, db: Session = Depends(get_db), user=Depends(get_current_user)):
    if not user.first_login:
        raise HTTPException(status_code=400, detail="Profile already setup")
    updated_user = user_crud.update_employee_profile(db, user, data.phone, data.address, data.blood_group)
    return updated_user

@router.get("/profile", response_model=UserResponse)
def get_profile(user=Depends(get_current_user)):
    return user
