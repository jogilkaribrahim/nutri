import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5001/api/auth/login', { email, password });
            localStorage.setItem('token', response.data.token);
            navigate('/upload');
        } catch (err) {
            setErrorMessage('Invalid email or password');
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.formContainer}>
                <h1 style={styles.heading}>Login</h1>
                <form onSubmit={handleSubmit} style={styles.form}>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        required
                        style={styles.input}
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                        style={styles.input}
                    />
                    <button type="submit" style={styles.button}>Login</button>
                </form>
                {errorMessage && <p style={styles.error}>{errorMessage}</p>}
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f4f4f4',
    },
    formContainer: {
        backgroundColor: '#fff',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '400px',
        textAlign: 'center',
    },
    heading: {
        color: '#a7c957',
        marginBottom: '1.5rem',
        fontSize: '2rem',
        fontWeight: '600',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
    },
    input: {
        padding: '0.8rem',
        fontSize: '1rem',
        border: '1px solid #ccc',
        borderRadius: '5px',
        outline: 'none',
        transition: 'border-color 0.3s',
    },
    inputFocus: {
        borderColor: '#a7c957',
    },
    button: {
        padding: '1rem',
        backgroundColor: '#a7c957',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        fontSize: '1rem',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
    buttonHover: {
        backgroundColor: '#8da74f',
    },
    error: {
        color: 'red',
        marginTop: '1rem',
    },
};

export default Login;
