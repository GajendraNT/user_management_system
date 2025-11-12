from fastapi import FastAPI
from app.core.database import Base, engine
from app.api.routes import auth, admin, employee

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="User Management System",
    version="1.0.0",
    description="A simple user management system with Admin and Employee roles."
)

app.include_router(auth.router, prefix="/api/auth", tags=["Auth"])
app.include_router(admin.router, prefix="/api/admin", tags=["Admin"])
app.include_router(employee.router, prefix="/api/employee", tags=["Employee"])
