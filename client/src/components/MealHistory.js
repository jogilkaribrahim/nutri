import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Button, Container, Divider, List, ListItem, ListItemText, Typography,} from '@mui/material';

const MealHistory = () => {
    const [meals, setMeals] = useState([]);

    const fetchMeals = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:5001/api/meal/history', {
                headers: {Authorization: `Bearer ${token}`},
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
                headers: {Authorization: `Bearer ${token}`},
            });
            setMeals(meals.filter(meal => meal._id !== mealId));
        } catch (err) {
            console.error('Error deleting meal', err);
        }
    };

    return (
        <Container component="main" maxWidth="lg">
            <Typography variant="h5" gutterBottom sx={{color: '#a7c957'}}>
                Your Meal History
            </Typography>
            <List>
                {meals.map((meal) => (
                    <div key={meal._id}>
                        <ListItem>
                            <ListItemText
                                primary={<Typography variant="h6">{meal.name}</Typography>}
                                secondary={
                                    <>
                                        <Typography variant="body2" color="textSecondary">
                                            Calories: {meal.nutrition.calories}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            Protein: {meal.nutrition.protein}g
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            Carbs: {meal.nutrition.carbs}g
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            Fats: {meal.nutrition.fats}g
                                        </Typography>
                                    </>
                                }
                            />
                            <Button
                                size="small"
                                color="error"
                                variant="outlined"
                                onClick={() => handleDelete(meal._id)}
                            >
                                Delete
                            </Button>
                        </ListItem>
                        <Divider/>
                    </div>
                ))}
            </List>
        </Container>
    );
};

export default MealHistory;
