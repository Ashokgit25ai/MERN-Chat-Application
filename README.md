MERN Chat Application
A full-stack real-time chat application built with the MERN stack. The application supports user authentication, one-to-one messaging, real-time communication with Socket.IO, online/offline status, typing indicators, unread message counts, image sharing, profile pictures, and message pagination.

The project is containerized with Docker and deployed on AWS EC2 using Docker Hub and GitHub Actions for CI/CD.
Live Application
- Frontend: http://65.0.7.77
- Backend API: http://3.7.240.240:5000
The public IP addresses may change if the EC2 instances are replaced or if the frontend instance is not assigned an Elastic IP.

Features
Authentication
- User registration and login
- JWT-based authentication
- Password hashing with bcrypt
- Protected API routes
- Authentication middleware
- Persistent login using JWT

One-to-One Chat
- Search registered users
- Start a private conversation
- View previous messages
- Maintain chat history
- Display latest message and timestamp

Real-Time Messaging
Socket.IO provides real-time communication between users.
- Real-time message delivery
- Real-time conversation updates
- No page refresh required
- Socket rooms for individual users

Online / Offline Status
- Online user tracking
- Online/offline indicators
- Last seen information
- Disconnect handling

Typing Indicator
Users can see when the other person is typing through Socket.IO events.
Read / Unread Messages
- Unread message counts
- Real-time unread counter updates
- Clear unread count when a conversation is opened

Image and File Sharing
- Share images through conversations
- Upload profile pictures
- Cloudinary integration for image storage

User Search
Search for registered users and start a conversation directly from the user list.
Message Pagination
Messages are loaded in pages instead of loading the entire conversation at once.

Example:
GET /api/message/get-all-messages/:chatId?page=1&limit=30

Tech Stack

Frontend
- React.js
- Vite
- Redux Toolkit
- React Router
- Axios
- Socket.IO Client
- HTML5
- CSS3

Backend
- Node.js
- Express.js
- REST APIs
- Socket.IO
- JWT
- bcrypt
- Mongoose

Database and Storage
- MongoDB Atlas
- Cloudinary

DevOps and Deployment
- Docker
- Docker Hub
- GitHub Actions
- AWS EC2
- Nginx

Architecture
                         Internet
                            │
                            ▼
                ┌──────────────────────┐
                │   AWS EC2 Frontend   │
                │                      │
                │ React + Nginx        │
                │ Docker Container     │
                │ Port 80              │
                └──────────┬───────────┘
                           │
                 /api + /socket.io
                           │
                           ▼
                ┌──────────────────────┐
                │   AWS EC2 Backend    │
                │                      │
                │ Node.js + Express    │
                │ Socket.IO            │
                │ Docker Container     │
                │ Port 5000 → 3300    │
                └───────┬───────┬──────┘
                        │       │
                        │       └──────────────┐
                        ▼                      ▼
              ┌─────────────────┐    ┌─────────────────┐
              │  MongoDB Atlas  │    │    Cloudinary   │
              │                 │    │                 │
              │ Users           │    │ Profile Images  │
              │ Chats           │    │ Chat Images     │
              │ Messages        │    │                 │
              └─────────────────┘    └─────────────────┘

CI/CD Pipeline
The project uses GitHub Actions to build and publish Docker images automatically.
Developer
    │
    ▼
GitHub Repository
    │
    ▼
GitHub Actions
    │
    ├── Client CI
    │     ├── npm ci
    │     ├── ESLint
    │     └── npm run build
    │
    ├── Server CI
    │     ├── npm ci
    │     └── node --check server.js
    │
    ▼
Docker Build
    │
    ├── Client Image
    │
    └── Server Image
    │
    ▼
Docker Hub
    │
    ├── mern-chat-client:latest
    │
    └── mern-chat-server:latest
    │
    ▼
AWS EC2
    │
    ├── Frontend container
    └── Backend container

Docker Hub Images
- dockerashok1225/mern-chat-client
- dockerashok1225/mern-chat-server

The Docker images are built and pushed automatically after changes are pushed to the configured GitHub branches.
Project Structure
MERN-Chat-Application/
│
├── client/
│   ├── public/
│   ├── src/
│   ├── Dockerfile
│   ├── nginx.conf
│   ├── .dockerignore
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
│
├── server/
│   ├── config/
│   │   └── dbConfig.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── chatController.js
│   │   ├── messageController.js
│   │   └── userController.js
│   ├── middlewares/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── user.js
│   │   ├── chat.js
│   │   └── message.js
│   ├── cloudinary.js
│   ├── app.js
│   ├── server.js
│   ├── Dockerfile
│   ├── .dockerignore
│   ├── package.json
│   └── package-lock.json
│
├── .github/
│   └── workflows/
│       └── ...
│
├── docker-compose.yml
└── README.md

Local Development
Prerequisites
Install:
- Node.js
- npm
- Git
- Docker (optional for containerized local development)
- MongoDB Atlas account or MongoDB
- Cloudinary account
Clone the Repository
git clone https://github.com/Ashokgit25ai/MERN-Chat-Application.git
cd MERN-Chat-Application

Backend Setup
cd server
npm install
Create:
server/.env
Example:
PORT_NUMBER=3300
CONN_STR=your_mongodb_connection_string
SECRET_KEY=your_jwt_secret
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

Start the backend:
node server.js
The backend runs locally on:
http://localhost:3300

Frontend Setup
Open another terminal:
cd client
npm install
npm run dev
The Vite development server normally runs on:
http://localhost:5173

Docker
The project contains separate Docker images for the frontend and backend.

Backend Docker Image
cd server
docker build -t mern-chat-server .
Run locally:
docker run -d \
  --name mern-chat-server \
  --env-file .env \
  -p 5000:3300 \
  mern-chat-server

Frontend Docker Image
cd client
docker build -t mern-chat-client .
Run locally:
docker run -d \
  --name mern-chat-client \
  -p 3000:80 \
  mern-chat-client
Open:
http://localhost:3000

Docker Compose
The root docker-compose.yml can be used for local containerized development:
docker-compose up --build
The local ports are:
Frontend: http://localhost:3000
Backend:  http://localhost:5000

MongoDB is not included as a Docker Compose service because the application uses MongoDB Atlas.

AWS Deployment
The production deployment uses two AWS EC2 instances.
Frontend EC2
Responsibilities:
- Serves the React production build
- Runs Nginx
- Handles /api/ requests through reverse proxy
- Handles /socket.io/ WebSocket traffic
- Runs the frontend Docker container

Container mapping:
EC2 port 80 → Container port 80
Backend EC2

Responsibilities:
- Runs Node.js and Express
- Runs Socket.IO
- Connects to MongoDB Atlas
- Connects to Cloudinary
- Handles REST API requests

Container mapping:
EC2 port 5000 → Container port 3300
Production Request Flow
Browser
   │
   ▼
Frontend EC2 :80
   │
   ├── React application
   │
   ├── /api/* ───────────────► Backend EC2 :5000
   │
   └── /socket.io/* ────────► Backend EC2 :5000
                                  │
                                  ├── MongoDB Atlas
                                  └── Cloudinary
Nginx Reverse Proxy
The production frontend uses Nginx to route API and Socket.IO traffic to the backend.
location /api/ {
    proxy_pass http://BACKEND_IP:5000;
}

location /socket.io/ {
    proxy_pass http://BACKEND_IP:5000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
}
The actual backend IP is configured in the production Nginx configuration.

Environment Variables
The application uses environment variables for sensitive configuration.

Backend variables include:
PORT_NUMBER
CONN_STR
SECRET_KEY
CLOUDINARY_NAME
CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET
For production, the environment file is stored separately on the backend EC2 instance and is passed to Docker with:
--env-file /home/ec2-user/mern-chat-server.env
Secrets are not stored inside the Docker image.

Never commit:
- MongoDB credentials
- JWT secrets
- Cloudinary API secrets
- Docker Hub passwords or access tokens
- Other private credentials

Security
The application uses:
- JWT authentication
- bcrypt password hashing
- Protected API routes
- Authentication middleware
- Authorization headers
- Environment variables for secrets
- CORS configuration
- Docker .dockerignore files to exclude .env

For production, backend network access should be restricted to trusted sources instead of exposing the backend port unnecessarily.
REST API Endpoints
Authentication
Method	Endpoint	Description
POST	/api/auth/signup	Register a new user
POST	/api/auth/login	Login a user


Users
Method	Endpoint	Description
GET	/api/user/get-logged-user	Get logged-in user
GET	/api/user/get-all-users	Get all users
POST	/api/user/upload-profile-picture	Upload profile picture


Chats
Method	Endpoint	Description
POST	/api/chat/create-new-chat	Create a chat
GET	/api/chat/get-all-chats	Get user chats
POST	/api/chat/clear-unread-message	Clear unread messages


Messages
Method	Endpoint	Description
POST	/api/message/new-message	Create a message
GET	/api/message/get-all-messages/:chatId	Get chat messages
GET	/api/message/get-all-messages/:chatId?page=1&limit=30	Get paginated messages


Socket.IO Events
User Presence
join-room
user-login
online-user
user-offline
disconnect
Messaging
send-message
receive-message
set-message-count
Typing
user-typing
started-typing
Read / Unread Messages
clear-unread-messages
messages-count-cleared
Database
MongoDB is used as the primary database through Mongoose.
User
Stores:
- Name
- Email
- Password hash
- Profile picture
- Last seen
Chat
Stores:
- Chat members
- Last message
- Unread message count
Message
Stores:
- Sender
- Chat ID
- Message content
- Message type
- Read status
- Created timestamp
Development Concepts
Frontend
- React components
- React Hooks
- Redux Toolkit
- React Router
- Axios
- REST API integration
- Form handling
- Conditional rendering
- Reusable components
- Responsive UI
- Socket.IO client
Backend
- Node.js
- Express.js
- REST API development
- Middleware
- JWT authentication
- Authorization
- bcrypt
- Controller-based architecture
- Socket.IO
- Socket rooms
- Error handling
Database
- MongoDB
- Mongoose
- Schema design
- CRUD operations
- References
- Population
- Query filtering
- Pagination
- Indexing
Real-Time Communication
- Socket.IO client/server communication
- Socket rooms
- Online/offline presence
- Last seen
- Real-time messaging
- Typing indicators
- Unread message counters
Testing
REST APIs can be tested with:
- Postman
- Browser DevTools
- Chrome Network tab
Socket.IO functionality can be tested with:
- Multiple browser windows
- Multiple user accounts
- Browser console
- Application logs
For production testing, verify:
- User registration and login
- Profile picture upload
- User search
- Chat creation
- Real-time messages
- Online/offline status
- Last seen
- Typing indicator
- Unread message count
- Message pagination
- Image/file sharing
Performance
Message pagination is used to avoid loading the complete conversation history at once.

A suitable MongoDB index for message queries is:
messageSchema.index({
    chatId: 1,
    createdAt: -1
});
Possible future improvements include:
- Cursor-based pagination
- Virtualized message lists
- Lazy loading
- Image optimization
- Caching
- Additional MongoDB indexes

Project Roadmap
Project Setup                         ✅
Express Backend                       ✅
MongoDB Integration                   ✅
Authentication                        ✅
JWT Protected Routes                  ✅
User APIs                             ✅
Chat APIs                             ✅
Message APIs                          ✅
React Frontend                        ✅
One-to-One Chat                       ✅
Socket.IO Integration                 ✅
Real-Time Messaging                   ✅
Online / Offline Status               ✅
Last Seen                             ✅
Typing Indicator                      ✅
Read / Unread Messages                ✅
Unread Message Counter                ✅
Image Sharing                         ✅
Profile Picture Upload               ✅
User Search                           ✅
Message Pagination                    ✅
Docker Containerization               ✅
Docker Hub Image Publishing           ✅
GitHub Actions CI/CD                  ✅
AWS EC2 Deployment                    ✅
Nginx Reverse Proxy                   ✅
MongoDB Atlas                         ✅
Cloudinary Integration                ✅


Learning Outcomes
This project provided practical experience with:
- Full-stack MERN development
- React application development
- REST API design
- JWT authentication
- MongoDB and Mongoose
- Real-time communication with Socket.IO
- Cloudinary integration
- Docker containerization
- Docker Hub
- GitHub Actions
- AWS EC2 deployment
- Nginx reverse proxy
- Environment and secret management
- Debugging production applications


Author
Ganesh Venkata Ashok

GitHub:
https://github.com/Ashokgit25ai

License
This project was developed for learning, practice, and portfolio purposes.