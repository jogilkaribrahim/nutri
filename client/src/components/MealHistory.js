import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Box,
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
    CardMedia,
    Button,
} from '@mui/material';

const MealHistory = () => {
    const [meals, setMeals] = useState([]);

    const fetchMeals = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:5001/api/meal/history', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setMeals(response.data.meals);
        } catch (err) {
            console.error('Error fetching meals', err);
        }
    };

    useEffect(() => {
        fetchMeals();
    }, []);

    const handleDelete = async (mealId) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:5001/api/meal/${mealId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setMeals(meals.filter(meal => meal._id !== mealId));
        } catch (err) {
            console.error('Error deleting meal', err);
        }
    };

    return (
        <Container component="main" maxWidth="lg">
            <Typography variant="h5" gutterBottom>Your Meal History</Typography>
            <Grid container spacing={3}>
                {meals.map((meal) => (
                    <Grid item xs={12} sm={6} md={4} key={meal._id}>
                        <Card>
                            <CardMedia
                                component="img"
                                height="140"
                                image={`http://localhost:5001/${meal.image}`}
                                alt="meal"
                            />
                            <CardContent>
                                <Typography variant="h6">{meal.name}</Typography>
                                <Typography variant="body2">Calories: {meal.nutrition.calories}</Typography>
                                <Typography variant="body2">Protein: {meal.nutrition.protein}g</Typography>
                                <Typography variant="body2">Carbs: {meal.nutrition.carbs}g</Typography>
                                <Typography variant="body2">Fats: {meal.nutrition.fats}g</Typography>

                                <Button
                                    size="small"
                                    color="error"
                                    variant="outlined"
                                    sx={{ marginTop: 1 }}
                                    onClick={() => handleDelete(meal._id)}
                                >
                                    Delete
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default MealHistory;
