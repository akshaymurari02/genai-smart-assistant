const express = require("express");
const config = require("./config");
const ragRoutes = require("./routes/ragRoutes");

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic routes
app.get("/", (req, res) => {
    res.json({ message: "Welcome to RAG Fundamentals API" });
});

// Health check endpoint
app.get("/health", (req, res) => {
    res.json({ status: "OK", timestamp: new Date().toISOString() });
});

// RAG routes
app.use("/rag", ragRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Something broke!" });
});

// Start server
app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
    console.log("Environment:", process.env.NODE_ENV || "development");
}); 