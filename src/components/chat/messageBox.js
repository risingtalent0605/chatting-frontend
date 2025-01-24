import React, { useState, useEffect, useRef } from 'react';
import {Typography, Card, Paper, Grid } from '@mui/material';
import { collection, query, orderBy, where, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';  

const MessageBox = ({ selectedUser }) => {

    const [messages, setMessages] = useState([]);
    const me = useSelector((state) => state.auth.user.email);
    const chatEndRef = useRef(null);    
    
    // get current user's all message 
    useEffect(() => {

        if (!selectedUser) return ;

        const messagesQuery = query(
            collection(db, 'messages'),
            where('sender', 'in', [selectedUser, me]),
            where('receiver', 'in', [selectedUser, me]),
            orderBy('timestamp', 'asc')
        );

        const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
            const newMessages = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })
          );
          
          setMessages(newMessages);
          chatEndRef.current.scrollIntoView({ behavior: 'smooth' });

        });

        return () => unsubscribe();

    }, [selectedUser]);

    return (
        <Paper sx={{ flexGrow: 1, overflowY: 'scroll', padding: '20px', marginTop: '10px' }}>
          <Grid container direction="column" spacing={2}>

            {
              messages.map((msg, index) => (
                <Grid item key={index}>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    style={{ display: 'flex' }}
                  >
                    <Card
                      sx={{
                        maxWidth: '70%',
                        color: msg.sender === me ? 'white' : 'black',
                        marginLeft: msg.sender === me ? 'auto' : '0',
                        backgroundColor: msg.sender === me ? 'rgb(105, 80, 232)' : 'khaki',
                        padding: '10px',
                        borderRadius: '12px',
                        boxShadow: 1,
                        display: 'inline-block'
                      }}
                    >
                      <Typography
                        sx={{
                          display: 'flex',
                          margin: '2px 4px'
                        }}
                        variant="body1"
                      > {msg.text}
                      </Typography>
                    </Card>
                  </motion.div>
                </Grid>

              ))}
              <div ref={chatEndRef} />
          </Grid>
        </Paper>
    )
}

export default MessageBox