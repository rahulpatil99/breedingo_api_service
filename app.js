require('dotenv').config();
const express = require("express");
const app = express();
const apiTestRouter = require("./src/routes/apiTest");

const PORT = process.env.PORT || 8000;

// Middleware
app.use(express.json());

// Routes
app.get("/", (request, response) => {
  response.send("Welcome to Node.js Server");
});

app.use("/api/test", apiTestRouter); // Test the API

// Server Start Function
const start = async () => {
  try {
    app.listen(PORT, () => {
      const timestamp = new Date().toLocaleString();
      console.log(`Server started on port ${PORT} at ${timestamp}`);
    });
  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }
};

// Graceful Shutdown
process.on('SIGTERM', () => {
  console.log('Process terminated');
  process.exit(0);
});

start();