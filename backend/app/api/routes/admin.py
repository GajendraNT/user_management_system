from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from app.schemas.user import UserCreate, UserResponse
from app.models.user import UserRole, User
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
    existing_user = user_crud.get_user_by_email(db, user.email)
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already exists")
    
    selected_role = UserRole.admin if user.is_admin else UserRole.employee

    db_user = user_crud.create_user(db, user, role=selected_role)
    return db_user

@router.get("/employees")
def list_employees(
    db: Session = Depends(get_db),
    admin=Depends(get_current_admin),
    skip: int = 0,
    limit: int = 10,
    search: Optional[str] = Query(None, description="Search by name or email"),
    sort_by: Optional[str] = Query("first_name", description="Sort field"),
    sort_order: Optional[str] = Query("asc", description="Sort order: asc or desc"),
):
    query = db.query(User).filter(User.role == UserRole.employee)

    if search:
        query = query.filter(
            (User.first_name.ilike(f"%{search}%"))
            | (User.last_name.ilike(f"%{search}%"))
            | (User.email.ilike(f"%{search}%"))
        )

    total_count = query.count()

    if sort_by in ["first_name", "last_name", "email"]:
        if sort_order == "desc":
            query = query.order_by(getattr(User, sort_by).desc())
        else:
            query = query.order_by(getattr(User, sort_by).asc())

    employees = query.offset(skip).limit(limit).all()

    return {
        "employees": employees,
        "total_count": total_count,
    }

@router.delete("/employees/{user_id}")
def delete_employee(user_id: int, db: Session = Depends(get_db), admin=Depends(get_current_admin)):
    success = user_crud.delete_user(db, user_id)
    if not success:
        raise HTTPException(status_code=404, detail="Employee not found")
    return {"message": "Employee deleted successfully"}
