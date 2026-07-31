import React from 'react'
import Header from './components/Header'
import Sidebar from './components/Sidebar'

const index = () => {
   

  return (
    <div className='home-page'>
      <Header />
      <div className="main-content">
        <Sidebar />
        
      </div>
    </div>
  )
}

export default index;
