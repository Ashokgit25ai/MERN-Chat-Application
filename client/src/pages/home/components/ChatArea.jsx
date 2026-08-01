import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../styles/chatArea.css";
import { hideLoader, showLoader } from "../../../redux/loaderSlice";
import toast from "react-hot-toast";
import { createNewMessage } from "../../apiCalls/message";

const ChatArea = () => {
  const dispatch = useDispatch();
  const { selectedChats, user } = useSelector((state) => state.userReducer);
  const selectedUser =
    selectedChats && selectedChats.members.find((u) => u._id !== user._id);
  const [message, setMessage] = useState(" ");

  const sendMessage = async () => {
    try {
      const newMessage = {
        chatId: selectedChats._id,
        sender: user._id,
        text: message,
      };
      dispatch(showLoader());
      const response = await createNewMessage(newMessage);
      dispatch(hideLoader());
      setMessage('');

    } catch (error) {
      dispatch(hideLoader());
      toast.error(error.message);
    }
  }; 

  return (
    <>
      {selectedChats && (
        <div className="app-chat-area">
          <div className="app-chat-area-header">
            {selectedUser.firstname + " " + selectedUser.lastname}
          </div>
          <div className="main-chat-area">CHAT AREA</div>
          <div className="send-message-div">
            <input
              type="text"
              className="send-message-input"
              placeholder="Type a message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={sendMessage} className="fa fa-paper-plane send-message-btn" aria-hidden="true"></button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatArea;
