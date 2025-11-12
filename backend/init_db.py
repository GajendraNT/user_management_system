import os
import sys

# Add app to path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app.core.database import Base, engine, SessionLocal
from app.models.user import UserRole
from app.schemas.user import UserCreate
from app.crud.user import get_user_by_email, create_user

def init():
    print("Initializing database...")

    # Create tables
    Base.metadata.create_all(bind=engine)

    db = SessionLocal()
    try:
        admin_email = "admin@mail.com"
        existing_admin = get_user_by_email(db, admin_email)

        if existing_admin:
            print(f"Admin user already exists: {admin_email}")
        else:
            print("Creating default admin user...")
            admin_user = UserCreate(
                first_name="Admin",
                last_name="User",
                email=admin_email,
                password="admin123",
                confirm_password="admin123",
                role=UserRole.admin
            )
            create_user(db, admin_user, role=UserRole.admin)
            print(f"Default admin created! Email: {admin_email}, Password: admin123")
    finally:
        db.close()

    print("Database initialization complete!")

if __name__ == "__main__":
    init()
