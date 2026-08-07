import React, { useEffect, useState } from "react";
import "../styles/userList.css";
import { useSelector } from "react-redux";
import { clearUnreadMessageCount, createNewChat } from "../../apiCalls/chat";
import { useDispatch } from "react-redux";
import { hideLoader, showLoader } from "../../../redux/loaderSlice";
import store from "./../../../redux/store";
import { setAllCurrentChats, setSelectedChats } from "../../../redux/userSlice";
import moment from "moment";
import toast from "react-hot-toast";

const UserList = ({ searchKey, socket }) => {
  const dispatch = useDispatch();
  const {
    allUsers,
    allCurrentChats,
    user: currentUser,
    selectedChats,
  } = useSelector((state) => state.userReducer);
  const startNewChat = async (searchedUserId) => {
    try {
      dispatch(showLoader());
      const response = await createNewChat([currentUser._id, searchedUserId]);
      dispatch(hideLoader());

      if (response.success) {
        toast.success(response.message);
        const newChat = response.data;
        const updatedChat = [...allCurrentChats, newChat];
        dispatch(setAllCurrentChats(updatedChat));
        dispatch(setSelectedChats(newChat));
      }
    } catch (error) {
      toast.error(response.message);
      dispatch(hideLoader());
    }
  };

  const openChat = (selectedUserId) => {
    const chat = allCurrentChats.find(
      (chat) =>
        chat.members.map((m) => m._id).includes(currentUser._id) &&
        chat.members.map((m) => m._id).includes(selectedUserId),
    );

    if (chat) {
      dispatch(setSelectedChats(chat));
    }
  };

  const isSelectedChat = (user) => {
    if (selectedChats) {
      return selectedChats.members.map((m) => m._id).includes(user._id);
    }
    return false;
  };

  const getLastMessage = (userId) => {
    const chat = allCurrentChats.find((chat) =>
      chat.members.map((m) => m._id).includes(userId),
    );

    if (!chat || !chat?.lastMessage) {
      return "";
    } else {
      const prefix =
        chat?.lastMessage?.sender === currentUser._id ? "You: " : "";
      return `${prefix} ${chat?.lastMessage?.text?.substring(0, 25)}`;
    }
  };

  const getLastMessageTimeStamp = (userId) => {
    const chat = allCurrentChats.find((chat) =>
      chat.members.map((m) => m._id).includes(userId),
    );

    if (!chat || !chat?.lastMessage) {
      return "";
    } else {
      return moment(chat?.lastMessage?.createdAt).format("hh:mm A");
    }
  };

  const getFullName = (user) => {
    const fName =
      user?.firstname?.at(0).toUpperCase() +
      user?.firstname?.slice(1).toLowerCase();
    const lName =
      user?.lastname?.at(0).toUpperCase() +
      user?.lastname?.slice(1).toLowerCase();

    return `${fName} ${lName}`;
  };

  const getUnreadMessageCount = (userId) => {
    const chat = allCurrentChats.find((chat) =>
      chat.members.map((m) => m._id).includes(userId),
    );

    if (
      chat?._id &&
      chat?.unreadMessagesCount &&
      chat?.lastMessage?.sender !== currentUser?._id
    ) {
      return (
        <div className="unread-message-counter">
          {" "}
          {chat.unreadMessagesCount}{" "}
        </div>
      );
    } else {
      return "";
    }
  };

  const getData = () => {
    if (searchKey === "") {
      return allCurrentChats;
    } else {
      return allUsers.filter((user) => {
        return `${user.firstname} ${user.lastname}`
          .toLowerCase()
          .includes(searchKey.toLowerCase());
      });
    }
  };

  useEffect(() => {
    socket.on(
      "receive-message",
      (message) => {
        const selectedChats = store.getState().userReducer.selectedChats;
        let allCurrentChats = store.getState().userReducer.allCurrentChats;

        if (selectedChats?._id !== message.chatId) {
          const updatedChats = allCurrentChats.map((chat) => {
            if (chat._id === message.chatId) {
              return {
                ...chat,
                unreadMessagesCount: (chat?.unreadMessagesCount || 0) + 1,
                lastMessage: message,
              };
            }
            return chat;
          });
          allCurrentChats = updatedChats;
        }
        //Find the latest chat
        const latestChat = allCurrentChats.find(chat => chat._id === message.chatId);
        //Get all remaining chats
        const otherChats = allCurrentChats.filter(chat => chat._id !== message.chatId);
        //Create new updated chat list
        allCurrentChats = [latestChat, ...otherChats]

          
        dispatch(setAllCurrentChats(allCurrentChats));
      });
  }, []);

  return getData().map((obj) => {
    let user = obj;
    if (obj.members) {
      user = obj.members.find((m) => m._id !== currentUser._id);
    }
    return (
      <div
        className="user-search-filter"
        onClick={() => openChat(user._id)}
        key={user._id}
      >
        <div
          className={isSelectedChat(user) ? "selected-user" : "filtered-user"}
        >
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
              {user.firstname?.at(0).toUpperCase() +
                user.lastname?.at(0).toUpperCase()}
            </div>
          )}
          <div className="filter-user-details">
            <div className="user-display-name">{getFullName(user)}</div>
            <div className="user-display-email">
              {getLastMessage(user._id) || user.email}
            </div>
          </div>
          <div className="read-time">
            <div className="last-message-timestamp">
              {getLastMessageTimeStamp(user._id)}
            </div>
            {getUnreadMessageCount(user._id)}
          </div>
          {!allCurrentChats.find((chat) =>
            chat.members.map((m) => m._id).includes(user._id),
          ) && (
            <div className="user-start-chat">
              <button
                className="user-start-chat-btn"
                onClick={() => startNewChat(user._id)}
              >
                Start Chat
              </button>
            </div>
          )}
        </div>
      </div>
    );
  });
};

export default UserList;
