const app = require('./app');
const { connectDB } = require('./config/db');
const http = require('http');
const { Server } = require('socket.io');

const PORT = process.env.PORT || 3000;

console.log("🚀 Starting server...");

// Create HTTP server with Express app
const server = http.createServer(app);

// Attach socket.io to this server
const io = new Server(server, {
  cors: {
    origin: "*", // allow all origins (change this in production for security)
    methods: ["GET", "POST"]
  }
});

// 🔹 Handle Socket.IO connections
io.on("connection", (socket) => {
  console.log(`✅ A user connected: ${socket.id}`);

  // Example: Send a welcome notification
  socket.emit("notification", "Welcome to CareConnect! 🚀");

  // Example: Listen for custom events
  socket.on("sendNotification", (msg) => {
    console.log("📢 Notification received:", msg);
    // Broadcast notification to all connected clients
    io.emit("notification", msg);
  });

  socket.on("disconnect", () => {
    console.log(`❌ User disconnected: ${socket.id}`);
  });
});

// Start server only after DB connection
connectDB()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`🌐 Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('❌ MongoDB connection failed:', error);
    process.exit(1);
  });
