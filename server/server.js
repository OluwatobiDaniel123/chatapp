// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import http from "http";
// import { Server } from "socket.io";
// import mongoose from "mongoose";
// import routes from "./routes/route.js";

// dotenv.config();
// const app = express();
// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: "*",
//   },
// });

// app.use(express.json());
// app.use(cors());
// app.use(routes);

// mongoose
//   .connect(process.env.MONGO_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("MongoDB Connected ✅"))
//   .catch((error) => console.error("MongoDB Connection Error ❌", error));

// const onlineUsers = new Map();

// io.on("connection", (socket) => {
//   console.log("A user connected:", socket.id);

//   socket.on("registerUser", (userId) => {
//     onlineUsers.set(userId, socket.id);
//   });

//   socket.on("sendLike", ({ fromUserId, toUserId }) => {
//     const toSocketId = onlineUsers.get(toUserId);
//     if (toSocketId) {
//       io.to(toSocketId).emit("receiveLike", { fromUserId });
//     }
//   });

//   socket.on("send_message", (data) => {
//     socket.broadcast.emit("receive_message", data);
//   });

//   socket.on("disconnect", () => {
//     console.log("User disconnected:", socket.id);
//     onlineUsers.forEach((value, key) => {
//       if (value === socket.id) {
//         onlineUsers.delete(key);
//       }
//     });
//   });
// });

// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import routes from "./routes/route.js";

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["https://chatapp-client-five.vercel.app/"], // Restrict to specific domains
    methods: ["GET", "POST"],
  },
});

// Middleware
app.use(express.json());
app.use(cors());
app.use(routes);

app.get("/", (req, res) => {
  res.send("Chat App Server is Running!");
});

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((error) => {
    console.error("MongoDB Connection Error ❌", error);
    process.exit(1); // Exit process if DB connection fails
  });

const onlineUsers = new Map();

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Register user with multiple devices support
  socket.on("registerUser", (userId) => {
    if (!onlineUsers.has(userId)) {
      onlineUsers.set(userId, new Set());
    }
    onlineUsers.get(userId).add(socket.id);
  });

  // Send a like notification
  socket.on("sendLike", ({ fromUserId, toUserId }) => {
    const toSocketIds = onlineUsers.get(toUserId);
    if (toSocketIds) {
      toSocketIds.forEach((socketId) => {
        io.to(socketId).emit("receiveLike", { fromUserId });
      });
    }
  });

  // Broadcast a message to all users except sender
  socket.on("send_message", (data) => {
    socket.broadcast.emit("receive_message", data);
  });

  // Handle user disconnection
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    onlineUsers.forEach((socketIds, userId) => {
      if (socketIds.has(socket.id)) {
        socketIds.delete(socket.id);
        if (socketIds.size === 0) {
          onlineUsers.delete(userId);
        }
      }
    });
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT} 🚀`));
