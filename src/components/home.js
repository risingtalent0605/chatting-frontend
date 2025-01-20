import React from 'react';
import { Box, Paper, Avatar, Typography, Button } from "@mui/material";

import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/store';

const Home = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = () => {
    localStorage.removeItem('token');
    dispatch(logout());
    navigate('/login');
  }

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
        </Avatar>
        <Typography variant="h5" component="h1" sx={{ mt: 5, mb: 3 }}>
              You are loggined successfully!
        </Typography>
        <Button
          type="button"
          onClick={handleChange}
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Log out
        </Button>
      </Paper>
    </Box>
  );
  
};

export default Home;