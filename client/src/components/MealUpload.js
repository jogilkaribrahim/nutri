import React, {useState} from 'react';
import {Box, Button, Container, Typography} from '@mui/material';
import axios from 'axios';

const MealUpload = () => {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!file) {
            setMessage('Please select an image');
            return;
        }

        const formData = new FormData();
        formData.append('mealImage', file);

        try {
            const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
            const response = await axios.post(
                'http://localhost:5001/api/meal/upload',
                formData,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            setMessage(response.data.message);
        } catch (err) {
            setMessage('Error uploading meal');
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 3}}>
                <Typography variant="h5" gutterBottom>Upload Your Meal</Typography>
                <form onSubmit={handleSubmit} style={{width: '100%'}}>
                    <input type="file" onChange={handleFileChange} style={{margin: '10px 0'}}/>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{marginTop: 2}}
                    >
                        Upload
                    </Button>
                </form>
                {message && <Typography variant="body2" color="error" sx={{marginTop: 2}}>{message}</Typography>}
            </Box>
        </Container>
    );
};

export default MealUpload;
