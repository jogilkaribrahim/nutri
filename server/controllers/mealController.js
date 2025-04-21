const Meal = require("../models/Meal"); // Define Meal model below
const path = require("path");

// Mock AI response for nutrition calculation
const mockAIResponse = (imagePath) => {
    // Simulate AI nutrition data based on the image path (just for testing)
    return {
        calories: 500,
        protein: 30,
        carbs: 40,
        fats: 20,
        imagePath: imagePath
    };
};

// Add meal
exports.addMeal = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({message: "No image uploaded"});
        }

        // Get nutrition data from AI (mocked for now)
        const nutrition = mockAIResponse(req.file.path);

        const newMeal = new Meal({
            user: req.user._id, // Get user from JWT
            image: req.file.path,
            nutrition: nutrition,
            createdAt: Date.now()
        });

        await newMeal.save();

        res.status(201).json({message: "Meal added successfully", meal: newMeal});
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Server error"});
    }
};


// Get user meal history
exports.getMealHistory = async (req, res) => {
    try {
        // Find all meals uploaded by the user
        const meals = await Meal.find({user: req.user._id}).sort({createdAt: -1});

        if (!meals.length) {
            return res.status(404).json({message: "No meals found"});
        }

        res.status(200).json({meals});
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Server error"});
    }
};

exports.deleteMeal = async (req, res) => {
    try {
        const meal = await Meal.findById(req.params.id);
        if (!meal) return res.status(404).json({message: 'Meal not found'});

        if (meal.user.toString() !== req.user.id)
            return res.status(401).json({message: 'Unauthorized'});

        await meal.deleteOne();
        res.json({message: 'Meal deleted'});
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
