MERN Chat Application
A full-stack real-time chat application built with the MERN stack.

The application supports authentication, one-to-one messaging, real-time communication with Socket.IO, online/offline status, typing indicators, unread message counts, image sharing, profile pictures, user search, and message pagination.

The application is containerized with Docker and deployed on AWS EC2 using Docker Hub and GitHub Actions.
Live Demo
- Frontend: http://65.0.7.77
- Backend API: http://3.7.240.240:5000
The EC2 public IP addresses may change if the instances are replaced or the frontend instance is not assigned an Elastic IP.

Features
- User registration and login
- JWT-based authentication
- Password hashing with bcrypt
- Protected API routes
- One-to-one conversations
- Real-time messaging with Socket.IO
- Online/offline status and last seen
- Typing indicators
- Unread message counts
- Image sharing
- Profile picture upload with Cloudinary
- User search
- Message pagination

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
Database & Storage
- MongoDB Atlas
- Cloudinary
DevOps & Deployment
- Docker
- Docker Hub
- GitHub Actions
- AWS EC2
- Nginx
Architecture
The application is deployed across two AWS EC2 instances.
Component	Technology	Port
Frontend EC2	React + Nginx + Docker	80
Backend EC2	Node.js + Express + Socket.IO + Docker	5000 → 3300
Database	MongoDB Atlas	Managed
Image Storage	Cloudinary	Managed


Production Request Flow
1. The browser loads the React application from the Frontend EC2 instance.
2. Nginx serves the React production build.
3. Nginx forwards /api/* requests to the Backend EC2 instance.
4. Nginx forwards /socket.io/* requests for real-time communication.
5. The backend communicates with MongoDB Atlas and Cloudinary.
CI/CD
GitHub Actions is used to validate the application and build Docker images.

Workflow:

GitHub → GitHub Actions → CI Checks → Docker Build → Docker Hub → AWS EC2
Client CI
- Install dependencies with npm ci
- Run ESLint
- Build the React application
Server CI
- Install dependencies with npm ci
- Validate the Node.js server with node --check
Docker Images
- dockerashok1225/mern-chat-client
- dockerashok1225/mern-chat-server
Docker images are automatically built and pushed after changes are pushed to the configured GitHub branches.
Project Structure
MERN-Chat-Application/
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
│
├── docker-compose.yml
└── README.md
Local Development
Prerequisites
- Node.js
- npm
- Git
- MongoDB Atlas account or MongoDB
- Cloudinary account
- Docker (optional)
Clone the Repository
git clone https://github.com/Ashokgit25ai/MERN-Chat-Application.git
cd MERN-Chat-Application
Backend Setup
cd server
npm install
Create server/.env:
PORT_NUMBER=3300
CONN_STR=your_mongodb_connection_string
SECRET_KEY=your_jwt_secret
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
Start the backend:
node server.js
Backend:

http://localhost:3300
Frontend Setup
Open another terminal:
cd client
npm install
npm run dev
Frontend:

http://localhost:5173
Docker
The project contains separate Docker images for the frontend and backend.
Backend
cd server

docker build -t mern-chat-server .

docker run -d   --name mern-chat-server   --env-file .env   -p 5000:3300   mern-chat-server
Frontend
cd client

docker build -t mern-chat-client .

docker run -d   --name mern-chat-client   -p 3000:80   mern-chat-client
Open:

http://localhost:3000
Docker Compose
For local containerized development:
docker-compose up --build
Local ports:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000
MongoDB is not included as a Docker Compose service because the application uses MongoDB Atlas.
AWS Deployment
The production deployment uses two AWS EC2 instances.
Frontend EC2
Responsibilities:
- Serves the React production build
- Runs Nginx
- Handles /api/* reverse proxy requests
- Handles /socket.io/* WebSocket traffic
- Runs the frontend Docker container
Port mapping: EC2 :80 → Container :80
Backend EC2
Responsibilities:
- Runs Node.js and Express
- Runs Socket.IO
- Connects to MongoDB Atlas
- Connects to Cloudinary
- Handles REST API requests
Port mapping: EC2 :5000 → Container :3300
Nginx Reverse Proxy
Nginx runs on the frontend container and forwards backend traffic to the backend EC2 instance.
location /api/ {
    proxy_pass http://BACKEND_IP:5000;
}

location /socket.io/ {
    proxy_pass http://BACKEND_IP:5000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
}
Environment Variables
The backend uses environment variables for sensitive configuration.
PORT_NUMBER
CONN_STR
SECRET_KEY
CLOUDINARY_NAME
CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET
For production, the environment file is stored separately on the backend EC2 instance and passed to Docker with:
--env-file /home/ec2-user/mern-chat-server.env
Secrets are not stored inside the Docker image.
Never Commit
- MongoDB credentials
- JWT secrets
- Cloudinary API secrets
- Docker Hub passwords or access tokens
- Other private credentials
API Endpoints
Authentication
Method	Endpoint	Description
POST	/api/auth/signup	Register a user
POST	/api/auth/login	Login a user


Users
Method	Endpoint	Description
GET	/api/user/get-logged-user	Get logged-in user
GET	/api/user/get-all-users	Get users
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
Presence
- join-room
- user-login
- online-user
- user-offline
- disconnect
Messaging
- send-message
- receive-message
- set-message-count
Typing
- user-typing
- started-typing
Read / Unread Messages
- clear-unread-messages
- messages-count-cleared
Database
MongoDB Atlas is used as the primary database through Mongoose.
User
- Name
- Email
- Password hash
- Profile picture
- Last seen
Chat
- Chat members
- Last message
- Unread message count
Message
- Sender
- Chat ID
- Message content
- Message type
- Read status
- Created timestamp
Security
- JWT authentication
- bcrypt password hashing
- Protected API routes
- Authentication middleware
- Authorization headers
- Environment variables for secrets
- CORS configuration
- .dockerignore files to exclude .env
For production, backend network access should be restricted to trusted sources where possible.
Author
Ganesh Venkata Ashok
- GitHub: https://github.com/Ashokgit25ai
License
This project was developed for learning, practice, and portfolio purposes.