import React from 'react'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import ChatArea from './components/ChatArea'

const index = () => {
   

  return (
    <div className='home-page'>
      <Header />
      <div className="main-content">
        <Sidebar />
        <ChatArea className="chat-area" />
      </div>
    </div>
  )
}

export default index;
