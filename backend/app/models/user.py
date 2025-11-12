from sqlalchemy import Column, Integer, String, Boolean, Enum
from sqlalchemy.sql import func
from sqlalchemy.types import DateTime
from app.core.database import Base
import enum

class UserRole(str, enum.Enum):
    admin = "admin"
    employee = "employee"

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String(100), nullable=False)
    last_name = Column(String(100), nullable=False)
    email = Column(String(150), unique=True, nullable=False, index=True)
    hashed_password = Column(String(255), nullable=False)
    role = Column(Enum(UserRole), default=UserRole.employee)
    phone = Column(String(20), nullable=True)
    address = Column(String(255), nullable=True)
    blood_group = Column(String(10), nullable=True)
    first_login = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
