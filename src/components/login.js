import React, { useState } from "react";
import { Box, Button, TextField, Typography, Paper, Avatar } from "@mui/material";
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { login } from "../redux/store";
import { auth, provider } from '../firebase';
import { signInWithPopup } from 'firebase/auth';
import axios from 'axios';

const Login = () => {


    // console.log(process.env.REACT_APP_BACKEND_URL);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState(" ");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.email === "" || formData.password === "") {
            return setError("Both fields are required!");
        } else {
            setError("");
            console.log("Form Submitted:", formData);
        }

        try {
            const token = (await axios.post(process.env.REACT_APP_BACKEND_URL + 'api/login', formData)).data.token;
            dispatch(login({ token }));
            navigate('/chat');
        } catch (error) {
            setError(error.response.data.error)
            console.error('Login Error:', error.response.data.error);
        }
    };

    const googleLogin = async (user) => {

        try {
            const data = { email: user.email, name: user.displayName, accessToken: user.idToken }
            const token = (await axios.post(process.env.REACT_APP_BACKEND_URL + 'api/google-login', data)).data.token;
            dispatch(login({ token }));
            navigate('/chat');
        } catch (error) {
            console.error('Login Error:', error.response.data);
        }
        navigate('/chat');
    };


    const handleSignIn = async () => {

        try {
            provider.addScope('email');
            const result = await signInWithPopup(auth, provider)
            const user = result._tokenResponse;
            console.log(user);
            googleLogin(user);
        } catch (error) {
            console.log('error');
            setError(error.message);
        }

    };

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            bgcolor="#f5f5f5"
        >
            <Paper
                elevation={3}
                sx={{
                    padding: "2rem",
                    maxWidth: "400px",
                    textAlign: "center",
                    borderRadius: "10px",
                }}
            >
                <Avatar sx={{ bgcolor: "primary.main", margin: "0 auto" }}>
                    {/* <LockOutlinedIcon /> */}
                </Avatar>
                <Typography variant="h5" component="h1" sx={{ mt: 1, mb: 3 }}>
                    Login
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        label="Password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 2 }}
                    >
                        Login
                    </Button>
                    <Button
                        type="button"
                        variant="outlined"
                        color="primary"
                        fullWidth
                        sx={{ mt: 2 }}
                        onClick={handleSignIn}
                    >
                        Login with Google
                    </Button>
                </form>
                <Typography variant="body2" sx={{ mt: 2 }}>
                    Don't have an account? <Link to="/register">Register</Link>
                    <Typography
                        color="error"
                        variant="body2"
                        sx={{ textAlign: "center", mt: 1 }}
                    >
                        {error}
                    </Typography>
                </Typography>
            </Paper>
        </Box>
    );
};

export default Login;