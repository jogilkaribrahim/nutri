const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const protect = require("./middleware/authMiddleware");
const mealRoutes = require("./routes/meal");

connectDB();

const app = express();

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000', // Allow only frontend to make requests
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/meal", mealRoutes);
app.get("/api/me", protect, (req, res) => {
    res.json({user: req.user});
});

app.post("/api/test", (req, res) => {
    res.json(req);
});

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}/`));
