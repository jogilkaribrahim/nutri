const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");
const {addMeal, getMealHistory, deleteMeal} = require("../controllers/mealController");
const protect = require("../middleware/authMiddleware");

// Route to upload meal image
router.post("/upload", protect, upload.single("mealImage"), addMeal);
router.get("/history", protect, getMealHistory);
router.delete('/:id', protect, deleteMeal);

module.exports = router;
