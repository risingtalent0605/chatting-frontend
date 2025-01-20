import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, List, ListItem, ListItemAvatar, ListItemText, Avatar, Badge, Button } from '@mui/material';
import { collection, query, where, onSnapshot, updateDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../redux/store';

const Sidebar = ({ selectedUser, setSelectedUser }) => {

    const [userList, setUserList] = useState([]);
    const [unreadCounts, setUnreadCounts] = useState({});
    const me = useSelector((state) => state.auth.user.email);
    const token = useSelector((state) => state.auth.user.token);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = () => {
        dispatch(logout());
        navigate('/login');
    }

    useEffect(() => {
        const getUserList = async () => {
            try {
                const response = await axios.get(process.env.REACT_APP_BACKEND_URL + '/api/getUserList?user=' + me, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                setUserList(response.data.user)
            } catch {
                dispatch(logout());
                navigate('/login');
            }
        }
        getUserList()
    }, [])

    useEffect(() => {

        const otherNewMessagesQuery = query(
            collection(db, 'messages'),
            where('receiver', '==', me),
            where('read', '==', false)
        );

        const unsubscribe = onSnapshot(otherNewMessagesQuery, (snapshot) => {

            const tempUnreadCounts = {};
            snapshot.docs.forEach(async (doc) => {
                const data = doc.data();
                tempUnreadCounts[data.sender] = (tempUnreadCounts[data.sender] || 0) + 1;
                tempUnreadCounts[selectedUser] = 0
                setUnreadCounts(tempUnreadCounts);
            });
        });

        return () => unsubscribe();

    }, [selectedUser])

    // update selected user's all messages as read
    useEffect(() => {
        if (!selectedUser) return;

        const messagesQuery = query(
            collection(db, 'messages'),
            where('sender', '==', selectedUser),
            where('receiver', '==', me),
            where('read', '==', false)
        );

        const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {

            snapshot.docs.forEach(async (item) => {
                const messageRef = doc(db, 'messages', item.id);
                await updateDoc(messageRef, {
                    read: true,
                });
            });
        });

        const tempUnreadCounts = unreadCounts;
        tempUnreadCounts[selectedUser] = 0;
        setUnreadCounts(tempUnreadCounts);

        return () => unsubscribe();

    }, [selectedUser])

    return (
        <Box sx={{ width: '25vw', backgroundColor: '#3f51b5', color: 'white', padding: '20px', display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h6" sx={{ marginBottom: '20px' }}>
            </Typography>
            <List>
                {
                    userList.map((user, index) => (
                        <ListItem
                            id={user.email}
                            key={index}
                            button='true'
                            onClick={() => { setSelectedUser(user.email); }}
                            sx={{ backgroundColor: selectedUser === user.email ? '#3233a2' : 'transparent', marginBottom: '10px', borderRadius: '8px' }}
                        >
                            <ListItemAvatar>
                                <Avatar sx={{ bgcolor: user.avatarColor }} />
                            </ListItemAvatar>
                            <ListItemText
                                style={{ color: 'white' }}
                                primary={user.name}
                                secondary={user.email}
                                secondaryTypographyProps={{
                                    style: { color: 'wheat' }  // Sets the color of the secondary text
                                }}
                            />
                            {unreadCounts[user.email] > 0 && user.email !== selectedUser && (
                                <Badge badgeContent={`+${unreadCounts[user.email]}`} color="warning" />
                            )}
                        </ListItem>
                    ))
                }
            </List>
            <Button
                type="button"
                onClick={handleChange}
                variant="contained"
                color="primary"
                sx={{ mt: 12 }}
            >
                Log out
            </Button>
        </Box>
    )
}

export default Sidebar