import React from "react";
import "../styles/userList.css";
import { useSelector } from "react-redux";
import { createNewChat } from "../../apiCalls/chat";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { hideLoader, showLoader } from "../../../redux/loaderSlice";
import { setAllCurrentChats } from "../../../redux/userSlice";

const UserList = ({ searchKey }) => {
  const dispatch = useDispatch();
  const { allUsers,allCurrentChats, user: currentUser } = useSelector((state) => state.userReducer);

   const startNewChat = async (searchedUserId) => {
        try{
            dispatch(showLoader());
            const response = await createNewChat([currentUser._id, searchedUserId])
            dispatch(hideLoader());

            if (response.success){
                toast.success(response.message);
                const newChat = response.data;
                const updatedChat = [...allCurrentChats, newChat]
                dispatch(setAllCurrentChats(updatedChat));
                console.log(allCurrentChats)
                console.log('allUsers', allUsers.length)
                console.log('allCurrentUsers', allCurrentChats.length)
            }
        }catch(error){
            toast.error(response.message);
            dispatch(hideLoader());
        }
    };

  return allUsers
    .filter((user) => {
      return searchKey
        ? `${user.firstname} ${user.lastname}`
            .toLowerCase()
            .includes(searchKey.toLowerCase())
        : allCurrentChats.some((chat) => chat.members.includes(user._id));
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
            <button className="user-start-chat-btn" onClick={() => startNewChat(user._id)}>Start Chat</button>
          </div>
        )}
      </div>
    ));
};

export default UserList;
