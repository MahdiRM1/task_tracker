# Task Tracker

A web-based task management system built with **Django REST Framework**, **PostgreSQL**, and **Vanilla JavaScript**.

## Features

- User registration and login
- JWT authentication
- Create, edit, and delete tasks
- View task details
- Task status management
- Task priority management
- Task due dates
- Search tasks
- Filter tasks by status and priority
- Pagination
- Activity logging
- Separate activity log page
- Persian RTL user interface

## Technologies

### Backend

- Python
- Django
- Django REST Framework
- PostgreSQL
- JWT Authentication

### Frontend

- HTML5
- CSS3
- JavaScript

### Tools

- Git
- GitHub
- Postman

# Installation

## Requirements

Before running the project, make sure you have installed:

- Python 3.13+
- PostgreSQL
- Git

## 1. Clone the Repository

```bash
git clone <REPOSITORY_URL>
cd task-tracker
```

## 2. Create Virtual Environment

```bash
python -m venv venv
```

### Linux / macOS

```bash
source venv/bin/activate
```

### Windows

```bash
venv\Scripts\activate
```

## 3. Install Dependencies

```bash
pip install -r requirements.txt
```

## 4. Create PostgreSQL Database

Create the project database in PostgreSQL:

```sql
CREATE DATABASE task_tracker;
```

Then configure the PostgreSQL connection in the Django settings.

Example:

```python
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": "task_tracker",
        "USER": "postgres",
        "PASSWORD": "your_password",
        "HOST": "127.0.0.1",
        "PORT": "5432",
    }
}
```

## 5. Apply Database Migrations

Navigate to the backend directory:

```bash
cd backend
```

Then run:

```bash
python manage.py migrate
```

## 6. Run the Backend

Start the Django server:

```bash
python3 manage.py runserver
```

The backend API will be available at:

```text
http://127.0.0.1:8000/api/
```

## 7. Run the Frontend

Open a terminal in the `frontend` directory:

```bash
cd frontend
```

Then run the following command:

```bash
python3 -m http.server 5500
```

The frontend will be available at:

```text
http://127.0.0.1:5500/
```

Open the login page:

```text
http://127.0.0.1:5500/login.html
```

> Keep the terminal running while using the frontend.

---

## Authentication

- User registration
- User login
- JWT access and refresh tokens
- Authentication-protected pages
- Logout

## Task Management

- Create tasks
- View task details
- Edit tasks
- Delete tasks
- Change task status
- Set task priority
- Set task due date

## Search and Filtering

Tasks can be searched and filtered by:

- Status
- Priority
- Title and description

## Pagination

Both tasks and activity logs support pagination.

The frontend provides:

- Previous page
- Next page
- Current page number

## Activity Logs

The system keeps a record of important task changes.

Each activity log contains information such as:

- Task
- User
- Action
- Previous value
- New value
- Creation time

This makes it possible to track changes made to tasks.

## Project Architecture

The project consists of two main parts:

```text
Backend
Django + Django REST Framework
        │
        │ REST API
        ▼
Frontend
HTML + CSS + JavaScript
```

The frontend communicates with the backend through REST API endpoints.

## Frontend Pages

```text
login.html
    │
    ▼
register.html

login
    │
    ▼
index.html
    │
    ├── Task Details
    │       ├── Edit
    │       └── Delete
    │
    └── Activity Logs
```

## Database

The project uses **PostgreSQL** as its database.

Django migrations are used to create and update the required database tables.

## API Authentication

Authenticated requests use the JWT access token:

```http
Authorization: Bearer <access_token>
```

The tokens are stored in the browser's `localStorage` after login.

## Notes

- The backend must be running before using the frontend.
- PostgreSQL must be running and the project database must exist.
- The frontend runs on port `5500`.
- The Django backend runs on port `8000`.

Default addresses:

```text
Frontend:
http://127.0.0.1:5500/

Backend:
http://127.0.0.1:8000/

API:
http://127.0.0.1:8000/api/
```

## License

This project was developed as a university project.
