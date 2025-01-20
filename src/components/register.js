import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { Box, Button, TextField, Typography, Paper, Avatar } from "@mui/material";

import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
const Register = () => {

  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  // const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.name === "" | formData.email === "" || formData.password === "") {
      return setError("All fields are required!");
    } else {
      setError("");
      // Implement authentication logic here
    }
    try {
      const { data } = await axios.post(process.env.REACT_APP_BACKEND_URL + '/api/register', formData);
      setError(data.message)
      // navigate('/login');
      console.log('User Registered:', data);
    } catch (error) {
      console.log('Registration Error:', error.response.data.error);
      setError(error.response?.data?.message || error.response.data.error);
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
          Register
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
          />
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
            Register
          </Button>
        </form>
        <Typography variant="body2" sx={{ mt: 2 }}>
          Have an account? <Link to="/login">login</Link>
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

export default Register;
