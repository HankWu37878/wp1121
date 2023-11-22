import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";


export type User = {
  id: string;
  username: string;
};

export type Friendship = {
  chatroomId: number;
  name1: string;
  name2: string;
};

export type Message = {
  id: number;
  chatroomId: number;
  authorName: string;
  friendName: string;
  content: string;
  createdAt: Date | null;
  state: string | null;
};


dotenv.config();

const app = express();
app.use(cors());
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
  
  socket.on("send_invitation", (newFriendship: Friendship) => {
    console.log("A user send invitation to " + newFriendship.name2);
    //socket.join(newFriendship.chatroomId.toString());
    io.emit("receive_invitation", newFriendship);
    console.log("new friendship");
  }); 

  /*socket.on("receive_message", (newFriendship: Friendship) => {
    socket.join(newFriendship.chatroomId.toString());
  })*/

  socket.on("send_message", (newMessage: Message) => {
    console.log("A user send message to " + newMessage.friendName);
    io.emit("receive_message", newMessage);
    console.log("new message");
  }); 


  socket.on("delete_chatroom", () => {
    io.emit("delete_chatroom");
  });

  socket.on("set_notification", () => {
    io.emit("set_notification");
  });

  socket.on("scroll", (newMessage: Message) => {
    io.emit("scroll", newMessage);
  });

  socket.on("unsend_message", () => {
    io.emit("unsend_message");
  });
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const port = process.env.PORT || 3001;
server.listen(port, () => {
  console.log("Server runnning on http://localhost:" + port);
});
