MERN Chat Application

MERN Chat Application is a full-stack real-time messaging application developed using the MERN stack: MongoDB, Express.js, React.js, and Node.js. The main purpose of the project is to provide users with a simple platform where they can register, log in, find other users, start private conversations, and exchange messages in real time.

Project Overview

The application provides user authentication, private one-to-one conversations, real-time messaging, online/offline presence, typing indicators, unread message counts, image sharing, profile picture management, user search, and message pagination.


The frontend is built with React.js and provides the user interface for authentication, user search, chat management, messaging, profile management, and real-time updates.


The backend is built with Node.js and Express.js. It provides REST APIs for authentication, users, chats, and messages. Socket.IO is used alongside the REST APIs to handle real-time communication between users.


MongoDB Atlas is used as the database for storing user, chat, and message information. Cloudinary 
is used for storing profile pictures and images shared through conversations.


Main Features

User Authentication
Users can create an account and log in securely.


The application uses:
- JWT for authentication
- bcrypt for password hashing
- Protected API routes
- Authentication middleware
- Persistent login using JWT


One-to-One Messaging
Users can search for registered users and start private conversations.


Each conversation maintains:
- Chat members
- Previous messages
- Latest message
- Message timestamp
- Unread message count

Real-Time Messaging
Socket.IO provides real-time communication between users.


When a user sends a message, the other user can receive it immediately without refreshing the page.


Real-time functionality is also used for:
- New message notifications
- Typing indicators
- Online/offline status
- Unread message updates
- Clearing unread message counts

Online and Offline Status
The application tracks whether users are currently online.


When a user disconnects, the application updates their last-seen information.


This allows users to see:
- Online status
- Offline status
- Last seen information

Typing Indicator
When a user is typing inside a conversation, the other participant receives a real-time typing notification through Socket.IO.

Unread Messages
The application keeps track of unread messages for conversations.


Unread counts are updated in real time and are cleared when the conversation is opened.
Profile Pictures and Image Sharing
Users can upload profile pictures.


Images can also be shared inside conversations.


Cloudinary is integrated as the external image storage service, while the resulting image URLs are stored with the relevant application data.

User Search
Users can search for registered users and start a conversation directly from the user list.

Message Pagination
Messages are loaded in pages instead of retrieving the complete conversation history at once.


This helps reduce the amount of data loaded when a conversation contains a large number of messages.

Frontend
The frontend is developed using React.js with Vite.


The main technologies used are:
- React.js
- Vite
- Redux Toolkit
- React Router
- Axios
- Socket.IO Client
- HTML5
- CSS3
React is responsible for the user interface and application components.


Redux Toolkit is used for application state management.


React Router handles navigation between different application views.


Axios is used to communicate with the backend REST APIs.


Socket.IO Client handles real-time communication with the backend.
Backend
The backend is developed using Node.js and Express.js.


It provides REST APIs for:
- User authentication
- User management
- Chat creation
- Chat retrieval
- Message creation
- Message retrieval
- Profile picture uploads
- Unread message management

The backend is organized using controllers, models, middleware, and configuration files.


JWT authentication middleware protects routes that require an authenticated user.


Mongoose is used to communicate with MongoDB Atlas and manage application schemas.

Real-Time Communication
The application uses Socket.IO for communication between the frontend and backend.


The Socket.IO implementation handles events related to:
- Joining user rooms
- User login
- Online users
- User disconnects
- Sending messages
- Receiving messages
- Typing indicators
- Unread message counts
- Clearing unread messages
User-specific Socket.IO rooms allow messages and status updates to be delivered to the appropriate users.

Database
MongoDB Atlas is used as the application's primary database.


The application contains three main data models.
User
Stores information such as:
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
- Creation timestamp
Mongoose is used for schema definition, database operations, references, population, filtering, and pagination.
Image Storage
Cloudinary is integrated for image storage.

It is used for:
- Profile pictures
- Images shared through conversations
The application uploads images to Cloudinary and stores the resulting URLs rather than storing the image files directly in MongoDB.
API Architecture
The application follows a REST API architecture for normal application operations.

The main API areas are:
- /api/auth — authentication
- /api/user — user operations
- /api/chat — chat operations
- /api/message — message operations
Socket.IO is used alongside these APIs for functionality that needs real-time updates.
Docker
The application is containerized using Docker.

There are separate Docker images for the frontend and backend.
Frontend Container
The React application is built into a production bundle and served using Nginx.

The frontend container exposes port 80.
Backend Container
The Node.js backend runs inside its own Docker container.

The application listens on container port 3300, which is mapped to port 5000 on the AWS EC2 instance.

Environment variables are supplied separately to the container so sensitive credentials are not stored inside the Docker image.
Nginx
Nginx is used in the frontend container to serve the React production application and act as a reverse proxy.

It handles:
- React application requests
- /api/* requests to the backend
- /socket.io/* requests for WebSocket communication
This allows the browser to communicate with the backend through the frontend server.
AWS Deployment
The production application is deployed using two AWS EC2 instances.
Frontend EC2
The frontend EC2 instance runs:
- React production build
- Nginx
- Frontend Docker container
The application is accessed through port 80.
Backend EC2
The backend EC2 instance runs:
- Node.js
- Express.js
- Socket.IO
- Backend Docker container
The backend container listens on port 3300 and the EC2 instance exposes it through port 5000.

The backend connects to:
- MongoDB Atlas
- Cloudinary
CI/CD
GitHub Actions is used to automate the application's CI/CD workflow.

When code is pushed to the configured GitHub branches, the workflow performs validation for both the frontend and backend.

For the frontend, the pipeline:
1. Installs dependencies
2. Runs ESLint
3. Builds the React application
For the backend, the pipeline:
1. Installs dependencies
2. Validates the Node.js server
After the CI checks pass, Docker images are built and pushed to Docker Hub.

The project uses two Docker Hub repositories:
- dockerashok1225/mern-chat-client
- dockerashok1225/mern-chat-server
The latest images can then be pulled onto the respective AWS EC2 instances for deployment.
Deployment Architecture
The production setup consists of:

Browser → Frontend EC2 → Nginx → Backend EC2 → MongoDB Atlas / Cloudinary

The frontend and backend are separated into different Docker containers and EC2 instances.

This separation makes the frontend and backend independently deployable.
Security
The project implements several basic security practices:
- JWT-based authentication
- bcrypt password hashing
- Protected API routes
- Authentication middleware
- Authorization headers
- Environment variables for secrets
- CORS configuration
- .dockerignore files to prevent .env files from entering Docker images
Sensitive values such as MongoDB credentials, JWT secrets, Cloudinary credentials, and Docker Hub credentials are kept outside the source code.
My Work and Learning
Through this project, I worked on both frontend and backend development and gained practical experience building and deploying a complete full-stack application.

The project helped me develop practical skills in:
- React.js
- Node.js
- Express.js
- REST API development
- MongoDB and Mongoose
- JWT authentication
- Socket.IO
- Redux Toolkit
- Cloudinary
- Docker
- Docker Hub
- GitHub Actions
- AWS EC2
- Nginx
- CI/CD
- Production debugging
- Environment and secret management
The project also gave me practical experience troubleshooting real deployment issues, including Docker containers, Nginx reverse proxy configuration, CORS, environment variables, Cloudinary configuration, and communication between frontend and backend services.
Current Deployment
The application is currently deployed using:
- React + Nginx on AWS EC2
- Node.js + Express + Socket.IO on AWS EC2
- MongoDB Atlas for database storage
- Cloudinary for image storage
- Docker for containerization
- Docker Hub for image publishing
- GitHub Actions for CI/CD


Author
Ganesh Venkata Ashok
- GitHub: https://github.com/Ashokgit25ai
License
This project was developed for learning, practice, and portfolio purposes.
