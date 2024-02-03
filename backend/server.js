const express = require("express");
const { createServer } = require("node:http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
const server = createServer(app);

app.use(express.json());
app.use(cors());

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const users = new Map();
let conversations = [];

io.on("connection", (socket) => {
  // socket.on("disconnect", () => {
  //   const filteredUser = users.filter((user) => user === socket.id);
  //   users = filteredUser;
  //   console.log("remaining users : ", users);
  // });

  socket.on("close_connection", (email) => {
    users.set(email, "");
  });

  socket.on("create_user", ({ user }) => {
    users.set(user, socket.id);
    console.log("connected user : ", users);
    const users_data = [...users.keys()];
    io.emit("fetched_users", { contacts: users_data });
  });

  socket.on("join", (email) => {
    console.log("joined ", email);
    socket.join(email);
  });

  socket.on("get_chat_by", ({ from, to }) => {
    console.log("from : ", from, " to : ", to);
    const chats = conversations.filter(
      (chat) =>
        (chat.from === from && chat.to === to) ||
        (chat.from === to && chat.to === from)
    );

    socket.emit("chat_by_id", { chats });
  });

  // socket.on("get_users", () => {
  //   socket.emit("fetched_users", users);
  // });

  socket.on("send_message", ({ message }) => {
    console.log("send_message :", message);
    conversations.push(message);
    const from = users.get(message.from);
    const to = users.get(message.to);
    io.to([from, to]).emit("message_received", { newMessage: message });
  });
});

server.listen(5000, () => {
  console.log("server up http://localhost:5000");
});
