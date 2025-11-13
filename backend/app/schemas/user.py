from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from enum import Enum

class RoleEnum(str, Enum):
    admin = "admin"
    employee = "employee"

class UserBase(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr
    role: RoleEnum = RoleEnum.employee

class UserCreate(UserBase):
    password: str = Field(..., min_length=6)
    confirm_password: str = Field(..., min_length=6)

class UserResponse(UserBase):
    id: int
    phone: Optional[str]
    address: Optional[str]
    blood_group: Optional[str]

    class Config:
        from_attributes = True

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"

class EmployeeProfileUpdate(BaseModel):
    phone: str
    address: str
    blood_group: str

class PasswordSetupRequest(BaseModel):
    new_password: str = Field(..., min_length=6)
    confirm_password: str = Field(..., min_length=6)
