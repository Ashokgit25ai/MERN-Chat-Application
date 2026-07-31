import React from "react";
import "../styles/userList.css";
import { useSelector } from "react-redux";

const UserList = ({ searchKey }) => {
  const { allUsers } = useSelector((state) => state.userReducer);
  const { allCurrentChats } = useSelector((state) => state.userReducer);
  return allUsers
    .filter((user) => {
      return (
        searchKey ?
        `${user.firstname} ${user.lastname}`
          .toLowerCase()
          .includes(searchKey.toLowerCase()) :
          allCurrentChats.some(chat => chat.members.includes(user._id))
      );
    })
    .map((user) => (
      <div className="user-search-filter" key={user._id}>
        {user.profilePic && (
          <div className="user-profile-pic">
            <img
              src={user.profilePic}
              alt="Profile Pic"
              className="user-profile-image"
            />
          </div>
        )}
        {!user.profilePic && (
          <div className="user-profile-pic">
            {user.firstname.charAt(0).toUpperCase() +
              user.lastname.charAt(0).toUpperCase()}
          </div>
        )}
        <div className="filter-user-details">
          <div className="user-display-name">{`${user.firstname} ${user.lastname}`}</div>
          <div className="user-display-email">{user.email}</div>
        </div>
        {!allCurrentChats.find((chat) => chat.members.includes(user._id)) && (
          <div className="user-start-chat">
            <button className="user-start-chat-btn">Start Chat</button>
          </div>
        )}
      </div>
    ));
};

export default UserList;
