# MERN Chat Application

A full-stack **real-time chat application** built using the **MERN Stack** (MongoDB, Express.js, React, and Node.js).

This application is designed to provide secure, real-time communication between users while demonstrating modern full-stack web development practices. It includes JWT-based authentication, RESTful APIs, MongoDB integration, and is being developed to support real-time messaging using Socket.IO. The project follows a scalable and modular architecture to support future enhancements such as group chats, media sharing, notifications, and user presence.

> **Current Status:** 🚧 Backend APIs Completed | Frontend & Real-Time Features In Progress

---

# Overview

This project demonstrates how to build a modern chat application from scratch using the MERN stack. The goal is to gain practical experience in backend development, REST APIs, authentication, database management, and eventually real-time communication.

---

# Tech Stack

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- bcrypt
- dotenv
- Morgan

## Frontend *(Coming Soon)*

- React.js
- React Router
- Axios

## Real-Time Communication *(Planned)*

- Socket.IO

---

# Features

## Completed

- Express server setup
- MongoDB database connection
- Environment variable configuration
- Modular project structure
- User Registration API
- User Login API
- JWT Authentication
- Password hashing using bcrypt
- Authentication middleware
- Get Logged-in User API
- Get All Users API
- Create New Chat API
- Get All Chats API
- Send Message API
- Update Last Message Automatically
- Unread Message Counter

## In Progress

- React Frontend
- Socket.IO Integration

## Planned

- Real-time messaging
- Online/Offline user status
- Typing indicator
- Read receipts
- Group chats
- Image and file sharing
- Chat search
- Message deletion
- User profile management
- Notifications
- Responsive UI
- Dark/Light Mode

---

# API Endpoints

## Authentication

| Method | Endpoint |
|---------|----------|
| POST | `/api/auth/signup` |
| POST | `/api/auth/login` |

---

## Users

| Method | Endpoint |
|---------|----------|
| GET | `/api/user/get-logged-user` |
| GET | `/api/user/get-all-users` |

---

## Chats

| Method | Endpoint |
|---------|----------|
| POST | `/api/chat/create-new-chat` |
| GET | `/api/chat/get-all-chats` |

---

## Messages

| Method | Endpoint |
|---------|----------|
| POST | `/api/message/new-message` |

---

# Learning Objectives

This project is helping me strengthen my understanding of:

- MERN Stack fundamentals
- Backend development with Node.js and Express.js
- MongoDB database management using Mongoose
- RESTful API development
- JWT Authentication
- Password Encryption
- Middleware
- Authentication & Authorization
- MongoDB Relationships
- Full-stack application architecture
- Real-time communication using Socket.IO

---

# Project Structure

```
MERN-Chat-Application/
│
├── client/                        # React Frontend (Coming Soon)
│
└── server/
    │
    ├── config/
    ├── controllers/
    │   ├── authController.js
    │   ├── chatController.js
    │   ├── messageController.js
    │   └── userController.js
    │
    ├── middlewares/
    │   └── authMiddleware.js
    │
    ├── models/
    │   ├── user.js
    │   ├── chat.js
    │   └── message.js
    │
    ├── app.js
    ├── server.js
    ├── package.json
    └── .env
```

---

# Getting Started

## Clone the Repository

```bash
git clone https://github.com/Ashokgit25ai/MERN-Chat-Application.git
```

## Navigate to Backend

```bash
cd MERN-Chat-Application/server
```

## Install Dependencies

```bash
npm install
```


## Run Development Server

```bash
npm run dev
```

---

# Authentication Flow

```
User Login
     │
     ▼
JWT Token Generated
     │
     ▼
Client Stores Token
     │
     ▼
Protected API Request
     │
Authorization: Bearer <token>
     │
     ▼
authMiddleware
     │
     ▼
Token Verification
     │
     ▼
req.userId Available in Controllers
```

---

# Prerequisites

Before working with this project, you should have:

- Basic knowledge of HTML, CSS, and JavaScript
- Familiarity with Node.js and npm
- Basic understanding of React
- Basic understanding of MongoDB
- MongoDB Atlas account or Local MongoDB

---

# Roadmap

- [x] Project setup
- [x] Express server
- [x] MongoDB connection
- [x] Mongoose configuration
- [x] User Authentication
- [x] JWT Authorization
- [x] Password Encryption
- [x] User APIs
- [x] Chat APIs
- [x] Message APIs
- [ ] Socket.IO Integration
- [ ] React Frontend
- [ ] Private Messaging
- [ ] Group Chats
- [ ] Image Sharing
- [ ] Read Receipts
- [ ] Notifications
- [ ] Deployment

---

# Future Improvements

- Real-time messaging using Socket.IO
- Typing indicator
- Online user tracking
- Push notifications
- File uploads
- Voice messages
- Video calling
- Chat search
- Admin dashboard

---

# Author

**Ganesh Venkata Ashok**

- GitHub: https://github.com/Ashokgit25ai

---

# License

This project is developed for learning, practice, and portfolio purposes.