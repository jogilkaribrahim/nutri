const mongoose = require("mongoose");

const MealSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    image: {type: String, required: true},
    nutrition: {
        calories: {type: Number, required: true},
        protein: {type: Number, required: true},
        carbs: {type: Number, required: true},
        fats: {type: Number, required: true},
    },
    createdAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model("Meal", MealSchema);
