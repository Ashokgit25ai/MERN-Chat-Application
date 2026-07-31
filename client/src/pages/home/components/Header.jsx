import React from 'react'
import './header.css'
import { useSelector } from 'react-redux'

const Header = () => {
  const { user } = useSelector(state => state.userReducer);
  console.log(user)
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

  return (
    <div className="app-header">
        <div className="app-logo">
            <i className="fa fa-comments" aria-hidden="true"></i>
        Convo Hub
        </div>
        <div className="app-user-profile">
            <div className="logged-user-name">{getFullName()}</div>
            <div className="logged-user-profile-pic">{getInitials()}</div>
        </div>
    </div>
   
  )
}

export default Header;
