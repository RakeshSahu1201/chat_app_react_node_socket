const express = require("express");
const { createServer } = require("node:http");
const fs = require("fs");
const cors = require("cors");
const { Server } = require("socket.io");
const { config } = require("./db/MongoConnection");
const { create_conversation } = require("./repository/Conversation");
const { get_users } = require("./repository/User");
const user_router = require("./router/User");
const conversation_router = require("./router/Conversation");

const app = express();
const server = createServer(app);

// making db connectivity
config();

app.use(express.json());
app.use(cors());
app.use("/media", express.static("media"));

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const users = new Map();

io.on("connection", (socket) => {
  //socket for user management :

  socket.on("login_me", async ({ logged_user }) => {
    console.log("login_me ", logged_user);
    if (logged_user === null) return;
    users.set(logged_user._id, { ...logged_user, socket_id: socket.id });
    console.log("connected_users  : ", users);
    const connected_users = await get_users();
    io.emit("get_connected_users", {
      connected_users: connected_users.data,
    });
  });

  //socket for conversation management :

  socket.on("send_message", async ({ message }, callback) => {
    try {
      const { data, error } = await create_conversation({ message });
      if (error) {
        callback({ error });
        return;
      }
      const from = users.get(message.from).socket_id;
      const to = users.get(message.to).socket_id;
      io.to([from, to]).emit("message_sent", { new_message: data });
      callback({ data });
    } catch (error) {
      console.log("create_conversation_error ", error.message);
      callback({ error: error.message });
    }
  });

  socket.on("send_media", ({ media_message }) => {
    const from = users.get(media_message.from).socket_id;
      const to = users.get(media_message.to).socket_id;
      io.to([from, to]).emit("message_sent", { new_message: media_message });
  });
});

app.use("/user", user_router);
app.use("/conversation", conversation_router);

server.listen(5000, () => {
  console.log("server up http://localhost:5000");
});
