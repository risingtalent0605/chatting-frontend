import React, { useState, useEffect } from 'react';
import { Box, AppBar, Toolbar, Typography } from '@mui/material';
import ChatInput from './chatInput';
import MessageBox from './messageBox';
import Sidebar from './sidebar';
import { SnackbarProvider } from 'notistack';
import { requestNotificationPermission, onForegroundNotification  } from "../../firebase";

const Chat = () => {

  const [selectedUser, setSelectedUser] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [deviceToken, setDeviceToken] = useState(null);

  useEffect(() => {
    const setupNotifications = async () => {
      const token = await requestNotificationPermission();
      if (token) {
        setDeviceToken(token); // Save token to send it to the backend
      }
    };

    setupNotifications();

    // Listen for foreground notifications
    onForegroundNotification((payload) => {
      console.log("Notification received in foreground:", payload);
      alert(`New message: ${payload.notification.body}`);
    });
  }, [])

  return (
    <SnackbarProvider maxSnack={5}>
          
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <Sidebar selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <AppBar position="sticky" sx={{ backgroundColor: '#3f51b5' }}>
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Chat with {selectedUser}
            </Typography>
          </Toolbar>
        </AppBar>
        {selectedUser && <MessageBox selectedUser={selectedUser} />}
        {selectedUser && <ChatInput selectedUser={selectedUser} newMessage={newMessage} setNewMessage={setNewMessage} />}
      </Box>
    </Box>
    </SnackbarProvider>
  );
};

export default Chat;