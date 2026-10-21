# MERN Chat Application

A full-stack real-time chat application built with the **MERN Stack** — MongoDB, Express.js, React.js, and Node.js.

The application allows users to register, log in securely, find other users, create chats, and exchange messages. It also includes real-time communication, online/offline status, unread message counts, and a responsive chat interface.

This project is being developed as a practical full-stack application to improve my skills in React, Node.js, Express.js, MongoDB, REST APIs, authentication, real-time communication, Docker, and CI/CD.

---

## 🚀 Live Project Status

**Current Status:** Active Development

The main application features are working, and the project is being improved with additional features and deployment-related work.

---

## ✨ Features

### Authentication

- User registration
- User login
- JWT-based authentication
- Password hashing with bcrypt
- Protected API routes
- Logged-in user information

### Users

- View available users
- Search/filter users
- Display user online/offline status
- Display last seen information

### Chat

- Create one-to-one chats
- View previous chats
- Select a chat from the user list
- Display the latest message
- Display message timestamps
- Show unread message count
- Clear unread messages when a chat is opened

### Messaging

- Send text messages
- Receive messages in real time
- Real-time message updates using Socket.IO
- Typing indicator
- Message input with multiple lines
- Press `Enter` to send a message
- Press `Shift + Enter` to create a new line
- Emoji support
- Image message support

### Frontend

- React.js
- React Router
- Redux for application state
- Axios for API requests
- Responsive chat interface
- WhatsApp-style message previews
- Automatic message preview truncation using CSS

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- REST APIs
- JWT authentication
- bcrypt password hashing
- Middleware for protected routes
- Cloudinary integration for media

### Development & Deployment

- Git and GitHub
- Separate `main` and `demo` branches
- GitHub Actions CI
- Docker
- Docker Compose
- Nginx for serving the React application
- Containerized frontend and backend

---

## 🛠️ Tech Stack

### Frontend

- React.js
- JavaScript
- React Router
- Redux
- Axios
- Socket.IO Client
- Vite

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- dotenv
- Morgan
- Socket.IO

### Tools

- Git
- GitHub
- VS Code
- Postman
- Docker
- Docker Compose
- Nginx
- GitHub Actions

### Cloud / Deployment

- AWS services are being explored for deployment
- Docker containers are used for the application
- CI/CD is configured using GitHub Actions

---

# 📁 Project Structure

```text

MERN-Chat-Application/
│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── redux/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── Dockerfile
│   ├── nginx.conf
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── config/
│   │   └── dbConfig.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── chatController.js
│   │   ├── messageController.js
│   │   └── userController.js
│   │
│   ├── middlewares/
│   │   └── authMiddleware.js
│   │
│   ├── models/
│   │   ├── user.js
│   │   ├── chat.js
│   │   └── message.js
│   │
│   ├── app.js
│   ├── server.js
│   ├── Dockerfile
│   └── package.json
│
├── .gitignore
├── docker-compose.yml
└── README.md


🔐 Authentication Flow

User
 │
 ▼
Login / Signup
 │
 ▼
Server verifies credentials
 │
 ▼
JWT token generated
 │
 ▼
Client stores token
 │
 ▼
Protected API request
 │
 ▼
Authorization: Bearer <token>
 │
 ▼
Authentication middleware
 │
 ▼
Token verified
 │
 ▼
Protected controller


🔌 API Endpoints

Authentication
Method	Endpoint
POST  	/api/auth/signup
POST 	/api/auth/login


Users
Method	Endpoint
GET	     /api/user/get-logged-user
GET	     /api/user/get-all-users


Chats
Method	Endpoint
POST	     /api/chat/create-new-chat
GET	     /api/chat/get-all-chats


Messages
Method	Endpoint
POST	     /api/message/new-message


🐳 Running with Docker

The project includes Docker configuration for both the frontend and backend.

Build the containers
docker-compose build

Start the application
docker-compose up

The application will be available at:
Frontend:
http://localhost:3000

Backend:
http://localhost:5000

Stop the containers
docker-compose down

Rebuild the frontend after changes
docker-compose build client
docker-compose up



💻 Running Without Docker

1. Clone the repository
git clone https://github.com/Ashokgit25ai/MERN-Chat-Application.git
cd MERN-Chat-Application

2. Start the backend
cd server
npm install

Create a .env file inside the server directory and add the required environment variables.

Then start the server:
npm run dev

3. Start the frontend
Open another terminal:
cd client
npm install
npm run dev




🔑 Environment Variables

The backend uses environment variables for database credentials, authentication, and Cloudinary configuration.

Example:
PORT_NUMBER=3300
CONN_STR=your_mongodb_connection_string
SECRET_KEY=your_secret_key
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

Do not commit your .env file or real credentials to GitHub.
🔄 CI/CD
GitHub Actions is used to automatically check the application when changes are pushed or pull requests are created.


The CI workflow currently checks:

Frontend
- Install dependencies
- Run ESLint
- Build the React application

Backend
- Install dependencies
- Check the Node.js server code

The project uses two main branches:
main
 │
 │ Stable version
 │
 └── demo
      │
      └── Development and new changes


Changes are developed in demo and merged into main after the required checks pass.

📚 What I Learned From This Project

This project has helped me gain practical experience with:
- Building REST APIs with Node.js and Express.js
- Working with MongoDB and Mongoose
- User authentication with JWT
- Password hashing with bcrypt
- React application development
- Managing application state with Redux
- Connecting React with backend APIs
- Real-time communication with Socket.IO
- Handling online/offline user status
- Managing unread messages
- Working with Cloudinary
- Git and GitHub workflows
- Branching and pull requests
- GitHub Actions
- Dockerizing frontend and backend applications
- Docker Compose
- Nginx
- Preparing an application for cloud deployment

🗺️ Roadmap
- [x] Project setup
- [x] Express server
- [x] MongoDB connection
- [x] User authentication
- [x] JWT authorization
- [x] Password hashing
- [x] User APIs
- [x] Chat APIs
- [x] Message APIs
- [x] React frontend
- [x] Socket.IO integration
- [x] Real-time messaging
- [x] Online/offline status
- [x] Unread message count
- [x] Typing indicator
- [x] Docker setup
- [x] GitHub Actions CI
- [ ] Image and file sharing improvements
- [ ] Read receipts
- [ ] Group chats
- [ ] Notifications
- [ ] Production deployment
- [ ] AWS integration

🔮 Future Improvements
- Group chats
- Read receipts
- Better media sharing
- Message deletion
- Message search
- Push notifications
- User profile management
- Voice messages
- Video calling
- Admin features
- Production deployment on AWS
👨‍💻 Author
Ganesh Venkata Ashok

GitHub: https://github.com/Ashokgit25ai
📄 License
This project was created for learning, practice, and portfolio purposes.
```