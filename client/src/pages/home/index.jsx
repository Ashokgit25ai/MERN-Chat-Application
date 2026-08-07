import React, { useEffect } from 'react'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import ChatArea from './components/ChatArea'
import { io } from 'socket.io-client'
import { useSelector } from 'react-redux'

const socket = io('http://localhost:3300')
const index = () => {
  const { selectedChats, user } = useSelector(state => state.userReducer);

  
  useEffect(() => {
    if(user) {
      socket.emit('join-room', user._id);
    }
  }, [user]);

  return (
    <div className='home-page'>
      <Header />
      <div className="main-content">
        <Sidebar />
        {selectedChats && <ChatArea className="chat-area" socket={socket} />}
      </div>
    </div>
  )
}

export default index;
