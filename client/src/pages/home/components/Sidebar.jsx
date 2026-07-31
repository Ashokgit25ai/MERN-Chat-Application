import React, { useState }  from 'react'
import '../styles/sideBar.css'
import Search from './Search'
import UserList from './UserList';
const Sidebar = () => {
    const [searchKey, setSearchKey] = useState('');

  return (
    <div className='app-sidebar'>
        {/* search user */}
        <Search 
            searchKey={searchKey} 
            setSearchKey={setSearchKey} 
        />
        {/* user list */}
        <UserList searchKey={searchKey} />
      
    </div>
  )
}

export default Sidebar
