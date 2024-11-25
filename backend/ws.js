require("dotenv").config();
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const Message = require("./models/Message");
const jwt = require("jsonwebtoken");
const cors = require("cors");

// Initialize Express App
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        allowedHeaders: ["Content-Type", "Authorization"],
    },
});

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/ims-db");

// WebSocket Setup
io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    // Authenticate WebSocket connections
    socket.on("sendMessage", async (data) => {
        const { token, content } = data;

        if (!token) {
            return socket.emit("errorMessage", { error: "No token provided" });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const userId = decoded.id;

            if (!content || typeof content !== "string") {
                return socket.emit("errorMessage", { error: "Invalid message content" });
            }

            // Save the message to the database
            const newMessage = new Message({ from:userId, content });
            await newMessage.save();


            // Broadcast the message to all connected clients
            io.emit("newMessage", newMessage);
        } catch (error) {
            socket.emit("errorMessage", { error: "Failed to process message" });
        }
    });

    // Handle disconnection
    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});

// Basic Route
app.get("/", (req, res) => {
    res.send("WebSocket server is running!");
});

// Start Server
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
