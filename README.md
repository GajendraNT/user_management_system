# User Management System (UMS)

### NOTE Switch to `dev` branch for code.

A full-stack role-based application built using **React (Vite) + TypeScript**, **FastAPI**, and **PostgreSQL**.  
This system provides complete role-based access for **Admin** and **Employee**, including authentication, profile management, and a sleek UI.

---

# Project Overview

The **User Management System** (UMS) allows organizations to manage employees and provides each employee with a personal profile management system.

## Admin Features

- Add new employees (auto-assigns employee role)
- View, search, and filter employees
- Pagination (server-side)
- View complete employee details
- Delete employees

## Employee Features

- View personal profile
- Edit personal details (phone, address, blood group)
- Strict validation for phone numbers
- First-time login requires password setup

## Tech Stack

| Layer           | Technology                           |
| --------------- | ------------------------------------ |
| Frontend        | React (Vite) + TypeScript + Tailwind |
| Backend         | FastAPI + SQLAlchemy + JWT Auth      |
| Database        | PostgreSQL                           |
| Runtime         | Python 3.12, Node 18+                |
| Dev Environment | Docker & Docker Compose              |

---

# Folder Structure

root/
\
├── backend/
\
├── frontend/
\
├── docker-compose.yml
\
└── README.md

---

# Local Setup (Without Docker)

Follow these steps to run the entire project manually during development.

---

## Backend Setup (Local)

### **1. Clone the repository**

```sh
git clone https://github.com/<your-username>/user-management-system.git
cd user-management-system
```

### **2. Create & activate virtual environment**

```sh
python3 -m venv venv
source venv/bin/activate     # Linux / Mac
venv\Scripts\activate.bat    # Windows
```

### **3. Install dependencies**

```sh
pip install -r requirements.txt
```

### **4. Create .env file inside backend**

```sh
POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_DB=
POSTGRES_HOST=
POSTGRES_PORT=

SECRET_KEY=
ALGORITHM=
ACCESS_TOKEN_EXPIRE_MINUTES=
```

### **5. Start PostgreSQL manually**

```sh
username: postgres
password: root
database: user_management_db
port: 5432
```

### **6. Start backend**

```sh
uvicorn app.main:app --reload
```

### Backend runs at:

http://localhost:8000

Swagger Docs: http://localhost:8000/docs

---

## Frontend Setup (Local)

### **1. Move to frontend folder**

```sh
cd ../frontend
```

### **2. Install dependencies**

```sh
npm install
```

### **3. Create .env file**

Create: `frontend/.env`

```sh
VITE_API_URL=<SERVER_LINK>/api
```

### **4. Install dependencies**

```sh
npm run dev
```

### Frontend runs at:

http://localhost:5173/

---

# Local Setup (Without Docker)

This project comes with complete Docker support for:

- Frontend
- Backend
- PostgreSQL

All started with one command.

### Step 1 — Create .env files

#### Backend .env

Create file: `backend/.env`

```sh
POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_DB=
POSTGRES_HOST=
POSTGRES_PORT=

SECRET_KEY=
ALGORITHM=
ACCESS_TOKEN_EXPIRE_MINUTES=
```

#### Frontend .env

Create file: `frontend/.env`

```sh
VITE_API_URL=
```

### Step 2 — Start all services using Docker

| Service     | URL                                                      |
| ----------- | -------------------------------------------------------- |
| Frontend    | [http://localhost:5172](http://localhost:5172)           |
| Backend API | [http://localhost:8080](http://localhost:8080)           |
| API Docs    | [http://localhost:8080/docs](http://localhost:8080/docs) |
| PostgreSQL  | localhost:5431                                           |
