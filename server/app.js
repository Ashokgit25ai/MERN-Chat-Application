const express = require("express");
const app = express();
const authRouter = require("./controllers/authController");
const userRouter = require("./controllers/userController");
const chatRouter = require("./controllers/chatController");
const messageRouter = require("./controllers/messageController");
const User = require('./models/user')

//use auth controller routers
app.use(express.json({
  limit: "50mb"
}));

const server = require("http").createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/chat/", chatRouter);
app.use("/api/message", messageRouter);

const onlineUsers = [];

io.on("connection", (socket) => {
  socket.on("join-room", (userid) => {
    socket.join(userid);
  });

  socket.on("send-message", (message) => {
    io.to(message.members[0])
      .to(message.members[1])
      .emit("receive-message", message);

      io.to(message.members[0])
      .to(message.members[1])
      .emit("set-message-count", message);

  });

  socket.on("clear-unread-messages", (data) => {
    io.to(data.members[0])
      .to(data.members[1])
      .emit("messages-count-cleared", data);
  });

  socket.on("user-typing", (data) => {
    io.to(data.members[0]).to(data.members[1]).emit("started-typing", data);
  });

  socket.on('user-login', userId => {
    socket.userId = userId
    if (!onlineUsers.includes(userId)) {
      onlineUsers.push(userId);
    }
    io.emit('online-user', onlineUsers)
  });

  socket.on('user-logout', async (userId) => {
    onlineUsers.splice(onlineUsers.indexOf(userId), 1);
    const lastSeen = new Date()
    await User.findByIdAndUpdate({
      lastSeen: lastSeen
    });
    io.emit('user-offline', onlineUsers);
  })

  socket.on("disconnect", async () => {
    const userId = socket.userId

    if(userId) {
      onlineUsers.splice(onlineUsers.indexOf(userId), 1);
    }
    const lastSeen = new Date();

    User.findByIdAndUpdate(userId,
      {lastSeen}
    );
    io.emit('user-offline', {
        userId,
       lastSeen,
      onlineUsers
    });
  })

});

module.exports = server;
