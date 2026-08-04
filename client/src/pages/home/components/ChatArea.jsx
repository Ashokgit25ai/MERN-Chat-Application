import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../styles/chatArea.css";
import { hideLoader, showLoader } from "../../../redux/loaderSlice";
import toast from "react-hot-toast";
import { createNewMessage, getAllMessages } from "../../apiCalls/message";
import moment from 'moment';

const ChatArea = () => {
  const dispatch = useDispatch();
  const { selectedChats, user } = useSelector((state) => state.userReducer);
  const selectedUser = selectedChats?.members?.find((u) => u?._id && u._id !== user?._id);
  const [message, setMessage] = useState("");
  const [allMessages, setAllMessages] = useState([]);

  const sendMessage = async () => {
    try {
      if (!selectedChats?._id || !user?._id || !message.trim()) {
        toast.error("Select a chat and enter a message");
        return;
      }
      const newMessage = {
        chatId: selectedChats._id,
        sender: user._id,
        text: message.trim(),
      };
      dispatch(showLoader());
      await createNewMessage(newMessage);
      dispatch(hideLoader());
      setMessage("");
    } catch (error) {
      dispatch(hideLoader());
      toast.error(error.message || "Failed to send message");
    }
  };

  const formatTime = (time) => {
    const now = moment();
    const difference = now.diff(moment(time), 'days');

    if (difference < 1) {
      return `Today ${moment(time).format('hh:mm A')}`;
    }else if (difference > 1) {
      return `Yesterday ${moment(time).format('hh:mm A')}`;
    }else {
      return moment(time).format('MMM D, hh:mm A');
    }
  };

  const getMessages = async () => {
    try {
      if (!selectedChats?._id) return;

      dispatch(showLoader());
      const response = await getAllMessages(selectedChats._id);
      dispatch(hideLoader());

      if (response.success) {
        setAllMessages(response.data);
      }
    } catch (error) {
      dispatch(hideLoader());
      toast.error(error.message || "Failed to load messages");
    }
  };

  useEffect(() => {

    getMessages();

  }, [selectedChats])

  return (
    <>
      {selectedChats && (
        <div className="app-chat-area">
          <div className="app-chat-area-header">
            {selectedUser ? `${selectedUser.firstname || ""} ${selectedUser.lastname || ""}`.trim() : "Select a chat"}
          </div>

          <div className="main-chat-area">
            {allMessages.map(msg => {
              const isCurrentUserSender = msg.sender === user._id;
              return <div className="message-container" key={msg._id}>
                        <div className={isCurrentUserSender? "send-message" : "received-message"}>
                          {msg.text}
                        </div>
                        <div className={`message-timestamp ${isCurrentUserSender ? 'send-time' : 'received-time'}`}>
                          {formatTime(msg.createdAt)}
                        </div>
                      </div>
            })}
          </div>

          <div className="send-message-div">
            <input
              type="text"
              className="send-message-input"
              placeholder="Type a message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={sendMessage} className="fa fa-paper-plane send-message-btn"></button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatArea;
