import React, { useEffect, useState } from 'react'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import ChatArea from './components/ChatArea'
import { io } from 'socket.io-client'
import { useSelector, useDispatch } from 'react-redux'
import { setSelectedChats } from '../../redux/userSlice'

const socket = io('http://localhost:3300')
const index = () => {
  const dispatch = useDispatch();
  const { selectedChats, user } = useSelector(state => state.userReducer);
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    if (!user) return;

    socket.emit('join-room', user._id);
    socket.emit('user-login', user._id);
  }, [user]);

  useEffect(() => {
    if (!user) return;

    socket.off('online-user').on('online-user', (onlineUserIds) => {
      setOnlineUsers(onlineUserIds);
    });

    socket.off('user-offline').on('user-offline', (data) => {
      const onlineUserIds = data.onlineUsers;
      setOnlineUsers(onlineUserIds);

      const currentSelectedChats = selectedChats;
      if (currentSelectedChats && data?.userId) {
        const updatedSelectedChats = {
          ...currentSelectedChats,
          members: currentSelectedChats.members.map((member) =>
            member._id === data.userId
              ? { ...member, lastSeen: data.lastSeen }
              : member,
          ),
        };
        dispatch(setSelectedChats(updatedSelectedChats));
      }
    });

    return () => {
      socket.off('online-user');
      socket.off('user-offline');
    };
  }, [user, selectedChats, dispatch]);

  return (
    <div className='home-page'>
      <Header socket={socket}/>
      <div className={`main-content ${selectedChats ? "chat-selected" : ""}`}>
        <Sidebar socket={socket} onlineUsers={onlineUsers}/>
        {selectedChats && <ChatArea className="chat-area" socket={socket} onlineUsers={onlineUsers}/>}
      </div> 
    </div>
  )
}

export default index;
