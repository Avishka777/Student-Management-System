# Student Management System

The Student Management System is a web application designed to streamline the management of student data, courses, and user authentication for an educational institution.

# Introduction

The Student Management System aims to provide a user-friendly interface for managing student-related tasks efficiently. It includes features such as user authentication, course creation, course enrollment, and student profile management.

# Features

- User authentication (sign up, sign in, sign out)
- Dashboard for administrators and users
- Create, update, and delete courses
- Enroll students in courses
- View student profiles and course details

# Technologies

Frontend:
- React.js
-Redux Toolkit for state management
- React Router for client-side routing
- Material-UI for UI components
- Firebase for user profile picture upload
- Vite.js for frontend development and bundling

Backend:
- Node.js with Express.js framework
- MongoDB for database management
- Mongoose for object modeling with MongoDB
- RESTful API architecture

# Getting Started with Project

To get started with the project, follow these steps:

1. Clone the Repository: Clone the project repository to your local machine using the following command:
    - git clone <repository_url> 
2. Install Dependencies: Open a terminal within the project directory and run the following command to install all dependencies:
    - npm install 
3. Create .env file: use "MONGO" for your MongoDB url and use "JWT_SECRET" for secret key:
    - JWT_SECRET = "anything"
    - MONGO = "mongodb+srv://xxx:xxx@xxx-xxx.nfsmyma.mongodb.net/?retryWrites=true&w=majority&appName=xxx-xxx"
4. Run Backend Server: Start the backend server by running the following command in the terminal:
    - npm run dev
5. Run Frontend Server: Open a new terminal and navigate to the frontend directory within the project directory using the following command:
    - cd frontend
6. Create .env file: use "VITE_FIREBASE_API_KEY" for your firebase api key:
    - VITE_FIREBASE_API_KEY  = ""AIzaxxxxxxxxxxxxxxxxxxx"
7. Then, run the following command to start the frontend server:
    - npm run dev
8. Access the Application: Open a web browser and go:
    -  http://localhost:5173/
9. Login: You can log in as an admin, faculty, or student using the provided credentials.
10. With these steps, you should now be able to run the project locally and access it through your web browser.
  
# Usage

- Sign up or sign in to access the dashboard.
- Create new courses or manage existing ones.
- Enroll students in courses.(Backend)
- View student profiles and course details.
