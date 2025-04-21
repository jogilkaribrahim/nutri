import React from 'react';
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import Login from './components/Login';
import MealUpload from './components/MealUpload';
import MealHistory from './components/MealHistory';
import Navbar from './components/Navbar';

const App = () => {
    const isAuthenticated = !!localStorage.getItem('token'); // Check if user is authenticated

    return (
        <Router>
            {isAuthenticated && <Navbar />} {/* Show Navbar only if authenticated */}
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/upload" element={isAuthenticated ? <MealUpload /> : <Navigate to="/login" />} />
                <Route path="/history" element={isAuthenticated ? <MealHistory /> : <Navigate to="/login" />} />
                <Route path="/" element={isAuthenticated ? <Navigate to="/upload" /> : <Navigate to="/login" />} />
            </Routes>
        </Router>
    );
};
export default App;
