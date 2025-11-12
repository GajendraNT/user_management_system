from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.schemas.user import UserCreate, UserResponse
from app.models.user import UserRole
from app.crud import user as user_crud
from app.api.deps import get_db, get_current_admin

router = APIRouter()

@router.get("/health-check")
def health_check():
    return {"status": "ok"}

@router.post("/add-employee", response_model=UserResponse)
def add_employee(user: UserCreate, db: Session = Depends(get_db), admin=Depends(get_current_admin)):
    if user.password != user.confirm_password:
        raise HTTPException(status_code=400, detail="Passwords do not match")
    db_user = user_crud.create_user(db, user, role=UserRole.employee)
    return db_user

@router.get("/employees", response_model=List[UserResponse])
def list_employees(db: Session = Depends(get_db), admin=Depends(get_current_admin)):
    return user_crud.get_users(db)

@router.get("/employees/{user_id}", response_model=UserResponse)
def get_employee(user_id: int, db: Session = Depends(get_db), admin=Depends(get_current_admin)):
    emp = user_crud.get_user(db, user_id)
    if not emp:
        raise HTTPException(status_code=404, detail="Employee not found")
    return emp

@router.delete("/employees/{user_id}")
def delete_employee(user_id: int, db: Session = Depends(get_db), admin=Depends(get_current_admin)):
    success = user_crud.delete_user(db, user_id)
    if not success:
        raise HTTPException(status_code=404, detail="Employee not found")
    return {"message": "Employee deleted successfully"}
