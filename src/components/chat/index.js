import React, { useState } from 'react';
import { Box, AppBar, Toolbar, Typography } from '@mui/material';
import ChatInput from './chatInput';
import MessageBox from './messageBox';
import Sidebar from './sidebar';

const Chat = () => {

  const [selectedUser, setSelectedUser] = useState(null);
  const [newMessage, setNewMessage] = useState('');

  return (
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
  );
};

export default Chat;