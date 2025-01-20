import React from 'react';
import { Box, TextField, Button } from '@mui/material';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { Send as SendIcon } from '@mui/icons-material';
import { useSelector } from 'react-redux';

const ChatInput = ({ selectedUser, setNewMessage, newMessage }) => {
    
    // const [newMessage, setNewMessage] = useState('');
    const me = useSelector((state) => state.auth.user.email);

    // send new message when you press enter key
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();  // Prevent the default action (form submission)
            handleSendMessage();  // Call the send message function
            setNewMessage('')
        }
    };
    
    // send new message to current user
    const handleSendMessage = async (e) => {
        if (newMessage.trim() === '' || !selectedUser ) return;
        await addDoc(collection(db, 'messages'), {
            text: newMessage,
            sender: me,
            receiver: selectedUser,
            read: false,
            timestamp: new Date(),
        });
    };

    return (
        <Box sx={{ padding: '20px', display: 'flex', alignItems: 'center' }}>
            <TextField
            id='messageInput'
            fullWidth
            variant="outlined"
            label="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={ (e) => { handleKeyPress(e) }}
            placeholder="Type a message..."
            sx={{ marginRight: '10px' }}
            />
            <Button variant="contained" color="primary" onClick={handleSendMessage}>
            <SendIcon />
            </Button>
        </Box>
    )
}

export default ChatInput;