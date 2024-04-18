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

#Technologies
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

# Setup
Frontend
1. Clone the repository. | git clone <repository-url>
2. Navigate to the frontend directory. | cd frontend
3. Install dependencies. | npm install
4. Set up environment variables. | Create a .env file (Use "VITE_FIREBASE_API_KEY" Name and enter your Firebase Api Key)
5. Start the development server. | npm run dev
Backend
1. Navigate to the backend directory. | cd Student-Management-System
2. Install dependencies. | npm install
3. Set up environment variables. | Create a .env file (Use "MONGO" for MongoDb Link and "JWT_SECRET" for Secret Key)
4. Start the backend server. | npm run dev

# Usage
- Sign up or sign in to access the dashboard.
- Create new courses or manage existing ones.
- Enroll students in courses.(Backend)
- View student profiles and course details.
