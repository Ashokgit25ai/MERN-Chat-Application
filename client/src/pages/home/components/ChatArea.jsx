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
import EmojiPicker from 'emoji-picker-react';


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
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [data, setData] = useState(null);

  const sendMessage = async (image) => {
    try {
      if (!selectedChats?._id || !user?._id || (!message.trim() && !image)) {
        toast.error("Select a chat and enter a message");
        return;
      }
      const newMessage = {
        chatId: selectedChats._id,
        sender: user._id,
        text: message.trim(),
        image
      };

      socket.emit("send-message", {
        ...newMessage,
        members: selectedChats.members.map((m) => m._id),
        read: false,
        createdAt: new Date().toISOString(),
      });
      await createNewMessage(newMessage);
      setMessage("");
      setShowEmojiPicker(false);
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

      console.log("show loader")
      dispatch(showLoader());
      const response = await getAllMessages(selectedChats._id);
      console.log("api finished", response)
      if (response.success) {
        setAllMessages(response.data);
      }else {
        toast.error(response.message)
      }
    } catch (error) {
      console.log('error', error)
      toast.error(error.message || "Failed to load messages");
     } finally {
        dispatch(hideLoader());
    }
  };

  const clearUnreadMessages = async () => {
    try {
      socket.emit("clear-unread-messages", {
        chatId: selectedChats._id,
        members: selectedChats.members.map((m) => m._id),
      });

      const response = await clearUnreadMessageCount(selectedChats?._id);
      const updatedChat = response.data;

      if (response.success && updatedChat) {
        // use the latest allCurrentChats from the store to avoid
        // overwriting any recent ordering updates performed elsewhere
        const latestAllCurrentChats = store.getState().userReducer.allCurrentChats;
        const updatedChats = latestAllCurrentChats.map((chat) => {
          if (chat._id === selectedChats?._id) {
            return {
                ...chat,
                unreadMessagesCount: 0,
            };
          }
          return chat;
        });

        dispatch(setAllCurrentChats(updatedChats));
        setAllMessages((prevMsgs) =>
          prevMsgs.map((msg) => ({ ...msg, read: true })),
        );
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const sendImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = async () => {
      sendMessage(reader.result)
    }
  }

  const backTOUserList = () => {
    dispatch(setSelectedChats(null));
  }

  useEffect(() => {

    getMessages();

    if (selectedChats?.lastMessage?.sender !== user._id) {
      clearUnreadMessages();
    }

    socket.off('receive-message').on("receive-message", (message) => {
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
      setData(data);
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
  }, [allMessages, isTyping]);

  return (
    <>
      {selectedChats && (
        <div className="app-chat-area">
          <div className="app-chat-area-header">
            <button className="mobile-back-btn" onClick={backTOUserList}>
                <i className="fa-solid fa-arrow-left"></i>
            </button>
            {selectedUser?.profilePic ?
            <div className="user-profile-pic">
              <img
                src={selectedUser?.profilePic}
                alt="Profile Pic"
                className="chat-user-image"
                
              />
            </div> :
            
             (
              <div className="user-profile-pic" >
                {selectedUser.firstname?.at(0).toUpperCase() +
                  selectedUser.lastname?.at(0).toUpperCase()}
              </div>
            )}
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
                    <div>{msg.text}</div>
                    <div>{msg.image && <img src={msg.image} alt="image" height={120} width={120} />}</div>
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
          </div>
          <div className="typing-indicator">
            {isTyping && selectedChats?.members.map(m => m._id).includes(data.sender) && <i>typing...</i>}
            </div>

          <div className="send-message-div">
            <div className="message-input-container">

              <div className="emoji-picker" style={{width:'100%', display:'flex', padding:'0px, 20px', justifyContent:'right', marginTop:'-20px' }}>
                {showEmojiPicker && <EmojiPicker style={{width:'300px', height:'30px'}} onEmojiClick={(e) => setMessage((prev) => prev + e.emoji)} />}
              </div>
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
              <label htmlFor="file">
                <i className="fa-regular fa-image send-image-btn"></i>
                <input type="file" 
                  id="file"
                  accept="image/jpg, image/jpeg, image/png, image/gif"
                  style={{display:'none'}}
                  onChange={sendImage}
                />
              </label>
              <button
                onClick={(e) => setShowEmojiPicker(!showEmojiPicker)}
                className="fa-regular fa-face-smile send-emoji-btn"
              ></button>
              <button
                onClick={() => sendMessage('')}
                className="fa fa-paper-plane send-message-btn"
              ></button>
            
            </div>
            
          </div>
        </div>
      )}
    </>
  );
};

export default ChatArea;
