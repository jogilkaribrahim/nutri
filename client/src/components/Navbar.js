import React from 'react';
import {AppBar, Button, Toolbar, Typography} from '@mui/material';
import {useNavigate} from 'react-router-dom';

const Navbar = () => {
    const history = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.reload();
        history('/login');
    };

    return (
        <AppBar position="static" sx={{marginBottom: 3}}>
            <Toolbar>
                <Typography variant="h6" sx={{flexGrow: 1, cursor: 'pointer'}} onClick={() => history.push('/upload')}>
                    Meal Tracker
                </Typography>
                <Button color="inherit" onClick={() => history('/upload')}>Upload</Button>
                <Button color="inherit" onClick={() => history('/history')}>History</Button>
                <Button color="inherit" onClick={handleLogout}>Logout</Button>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
