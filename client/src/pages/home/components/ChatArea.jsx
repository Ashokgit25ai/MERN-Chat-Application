import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../styles/chatArea.css";
import { hideLoader, showLoader } from "../../../redux/loaderSlice";
import toast from "react-hot-toast";
import { createNewMessage, getAllMessages } from "../../apiCalls/message";
import { clearUnreadMessageCount } from "../../apiCalls/chat";
import moment from "moment";
import store from "./../../../redux/store";
import { setAllCurrentChats, setSelectedChats } from "../../../redux/userSlice";

const ChatArea = ({ socket }) => {
  const dispatch = useDispatch();
  const { selectedChats, user, allCurrentChats } = useSelector(
    (state) => state.userReducer,
  );
  const selectedUser = selectedChats?.members?.find(
    (u) => u?._id && u._id !== user?._id,
  );
  const [message, setMessage] = useState("");
  const [allMessages, setAllMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

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

      socket.emit("send-message", {
        ...newMessage,
        members: selectedChats.members.map((m) => m._id),
        read: false,
        createdAt: new Date().toISOString(),
      });
      await createNewMessage(newMessage);
      setMessage("");
    } catch (error) {
      toast.error(error.message || "Failed to send message");
    }
  };

  const formatTime = (time) => {
    const now = moment();
    const difference = now.diff(moment(time), "days");

    if (difference === 0) {
      return `${moment(time).format("hh:mm A")}`;
    } else if (difference === 1) {
      return `Yesterday ${moment(time).format("hh:mm A")}`;
    } else {
      return moment(time).format("MMM D, hh:mm A");
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
      toast.error(error.message || "Failed to load messages");
    }
  };

  const clearUnreadMessages = async () => {
    try {
      socket.emit("clear-unread-messages", {
        chatId: selectedChats._id,
        members: selectedChats.members.map((m) => m._id),
      });

      const response = await clearUnreadMessageCount(selectedChats?._id);

      if (response.success) {
        allCurrentChats.map((chat) => {
          if (chat._id === selectedChats?._id) {
            return response.data;
          }
          return chat;
        });
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (!selectedChats?._id) return;
    getMessages();

    if (selectedChats?.lastMessage?.sender !== user._id) {
      clearUnreadMessages();
    }

    socket.on("receive-message", (message) => {
      const selectedChats = store.getState().userReducer.selectedChats;
      if (selectedChats._id === message.chatId) {
        setAllMessages((prevMsgs) => [...prevMsgs, message]);
      }

      if (selectedChats._id === message.chatId && message.sender !== user._id) {
        clearUnreadMessages();
      }
    });

    socket
      .off("messages-count-cleared")
      .on("messages-count-cleared", (data) => {
        const allCurrentChats = store.getState().userReducer.allCurrentChats;
        const selectedChats = store.getState().userReducer.selectedChats;

        if (selectedChats._id === data.chatId) {
          //Updating the unread msg count
          const updatedChats = allCurrentChats.map((chat) => {
            if (chat._id === data.chatId) {
              return {
                ...chat,
                unreadMessagesCount: 0,
              };
            }
            return chat;
          });
          dispatch(setAllCurrentChats(updatedChats));

          //updating the read property in message object
          setAllMessages((prevMsgs) => {
            return prevMsgs.map((msg) => {
              return { ...msg, read: true };
            });
          });
        }
    });

    socket.on('started-typing', data => {
      if (selectedChats._id === data.chatId && data.sender !== user._id) {
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
        }, 2000);
      }
    })

  }, [selectedChats]);

  useEffect(() => {
    const msgBoxContainer = document.getElementById("main-chat-box-container");
    msgBoxContainer.scrollTop = msgBoxContainer.scrollHeight;
  }, [allMessages]);

  return (
    <>
      {selectedChats && (
        <div className="app-chat-area">
          <div className="app-chat-area-header">
            {selectedUser
              ? `${selectedUser.firstname || ""} ${selectedUser.lastname || ""}`.trim()
              : "Select a chat"}
          </div>

          <div id="main-chat-box-container" className="main-chat-area">
            {allMessages.map((msg) => {
              const isCurrentUserSender = msg.sender === user._id;
              return (
                <div className="message-container" key={msg._id}>
                  <div
                    className={
                      isCurrentUserSender ? "send-message" : "received-message"
                    }
                  >
                    {msg.text}
                  </div>
                  <div
                    className={`message-timestamp ${isCurrentUserSender ? "send-time" : "received-time"}`}
                  >
                    {formatTime(msg.createdAt)}{" "}
                    {msg.sender === user._id &&
                      (msg.read ? (
                        <i className="fa-solid fa-check-double read-icon"></i>
                      ) : (
                        <i className="fa-solid fa-check-double sent-icon"></i>
                      ))}
                  </div>
                </div>
              );
            })}
            <div className="typing-indicator">{isTyping && <i>typing...</i>}</div>
          </div>

          <div className="send-message-div">
            <input
              type="text"
              className="send-message-input"
              placeholder="Type a message"
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                socket.emit("user-typing", {
                  chatId: selectedChats._id,
                  members: selectedChats.members.map(m => m._id),
                  sender: user._id
                });
              }}
            />
            <button
              onClick={sendMessage}
              className="fa fa-paper-plane send-message-btn"
            ></button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatArea;
