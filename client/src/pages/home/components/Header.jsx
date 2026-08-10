import React from 'react'
import '../styles/header.css'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Header = ( { socket } ) => {
  const { user } = useSelector(state => state.userReducer);
  const navigate = useNavigate();

  const getFullName = () => {
    const firstName = user?.firstname?.toUpperCase()[0] + user?.firstname?.slice(1).toLowerCase();
    const lastName = user?.lastname?.toUpperCase()[0] + user?.lastname?.slice(1).toLowerCase();

    return `${firstName} ${lastName}`
  };
  const getInitials = () => {
    const firstNameInitial = user?.firstname.toUpperCase()[0];
    const lastNameInitial = user?.lastname.toUpperCase()[0]; 

    return `${firstNameInitial+lastNameInitial}`
  }

  const logOut = () => {
    socket.emit('user-logout', user?._id);

    localStorage.removeItem('token');
    navigate('/login');
  }

  return (
    <div className="app-header">
        <div className="app-logo">
            <i className="fa fa-comments" aria-hidden="true"></i>
        Convo Hub
        </div>
        <div className="app-user-profile"> 
            {user?.profilePic ? <img src={user?.profilePic} className="logged-user-profile-image" onClick={() => navigate('/profile')} /> :
             <div className="logged-user-profile-pic" onClick={() => navigate('/profile')}>{getInitials()}</div>}
            <div className="logged-user-name">{getFullName()}</div>
            <button className="logout-btn" onClick={logOut}>
                <i className="fa-solid fa-arrow-right-from-bracket"></i>
                
            </button>
        </div>
    </div>
   
  )
}

export default Header;
