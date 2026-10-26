# Task Manager MERN Application

## Project Description

This is a simple Task Manager application built using the MERN stack.

The application allows users to:

- Add new tasks
- View all tasks
- Search tasks by title
- Filter tasks by completed or pending status
- Mark tasks as completed or pending
- Delete tasks

The project has a React frontend and an Express/MongoDB backend.

## Technologies Used

### Frontend

- React.js
- Axios
- CSS
- Vite

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- CORS
- dotenv

## Project Structure

```text
tsk 33/

├── controllers/
│   └── taskController.js
│
├── models/
│   └── Task.js
│
├── routes/
│   └── taskRoutes.js
│
├── services/
│   └── taskService.js
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── .env
├── server.js
├── package.json
└── README.md