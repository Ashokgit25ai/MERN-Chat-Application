import React, { useEffect, useState } from 'react'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import ChatArea from './components/ChatArea'
import { io } from 'socket.io-client'
import { useSelector } from 'react-redux'
import { setSelectedChats } from '../../redux/userSlice'

const socket = io('http://localhost:3300')
const index = () => {
  const { selectedChats, user } = useSelector(state => state.userReducer);
  const [onlineUsers, setOnlineUsers] = useState([]);
  useEffect(() => {
    if(user) {
      socket.emit('join-room', user._id);
      socket.emit('user-login', user._id);
      socket.on('online-user', onlineUsers => {
        setOnlineUsers(onlineUsers);
      });
      socket.on('user-offline', (data) => {
        setOnlineUsers(data.onlineUsers);

        if(selectedChats) {
        const updatedChats =  { ...selectedChats,
          members: selectedChats?.members?.map( member => member._id === data.chatId)
                                            ? {...member, lastSeen: data.lastSeen} 
                                            : member}
        };
      })
    }

  }, [user]);

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
