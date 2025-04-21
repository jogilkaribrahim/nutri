import React from 'react';
import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const history = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.reload();
        history('/login');
    };

    return (
        <AppBar position="static" sx={{ marginBottom: 3, backgroundColor: '#a7c957' }}>
            <Toolbar>
                <Typography
                    variant="h6"
                    sx={{
                        flexGrow: 1,
                        cursor: 'pointer',
                        color: 'white',
                        '&:hover': { color: '#fff', textDecoration: 'underline' },
                    }}
                    onClick={() => history('/upload')}
                >
                    Nutrio
                </Typography>
                <Button
                    color="inherit"
                    sx={{
                        '&:hover': { backgroundColor: '#8da74f' },
                    }}
                    onClick={() => history('/upload')}
                >
                    Upload
                </Button>
                <Button
                    color="inherit"
                    sx={{
                        '&:hover': { backgroundColor: '#8da74f' },
                    }}
                    onClick={() => history('/history')}
                >
                    History
                </Button>
                <Button
                    color="inherit"
                    sx={{
                        '&:hover': { backgroundColor: '#8da74f' },
                    }}
                    onClick={handleLogout}
                >
                    Logout
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
