import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, CircularProgress, Link } from '@mui/material';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const VerifyEmail = () => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const token = new URLSearchParams(location.search).get('token');

    if (token) {
      axios.get(process.env.REACT_APP_BACKEND_URL + `api/verify-email?token=${token}`)
        .then((response) => {
          setMessage(response.data.message);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          
          setMessage(error.response?.data?.message || 'Verification failed');
          setLoading(false);
        });
    }
  }, [location]);

  return (
    <Container maxWidth="sm">
      <Box mt={4}>
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            <Typography variant="h5">{message}</Typography>
            <Link href='/login' variant="contained" color="secondary" fullWidth>
              Go to Login
            </Link>
          </>
        )}
      </Box>
    </Container>
  );
};

export default VerifyEmail;