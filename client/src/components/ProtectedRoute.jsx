import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getLoggedUser, getAllUsers } from "../pages/apiCalls/users";
import { getAllChats } from "../pages/apiCalls/chat";
import { useDispatch, useSelector } from "react-redux";
import { hideLoader, showLoader } from "../redux/loaderSlice";
import toast from "react-hot-toast";
import { setUser, setAllUsers, setAllCurrentChats } from "../redux/userSlice";

const ProtectedRoute = ({ children }) => {
  const { user } = useSelector(state => state.userReducer);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // GET LOGGED USER
  const getLoggedInUser = async () => {
    let response = null;
    try {
      dispatch(showLoader());
      response = await getLoggedUser();
      dispatch(hideLoader());

      if (response.success) {
        dispatch(setUser(response.data));
      } else {
        toast.error(response.message)
        window.location.href = '/login'
      }
    } catch (error) {
      dispatch(hideLoader());
      navigate("/login");
    }
  };


  // GET ALL LOGGED USERS
  const getAllLoggedUsers = async () => {
    let response = null;
    try{
    dispatch(showLoader());
    response = await getAllUsers();
    dispatch(hideLoader());

    if (response.success){
      dispatch(setAllUsers(response.data));
    }else{
      toast.error(response.message);
      window.location.href = '/login'
    }

    }catch(error){
      dispatch(hideLoader());
      navigate('/login')
    }
  };
  
  //GET ALL CHATS CONNECTED WITH CURRENT USER
  const getAllCurrentUserChats = async () => {
    let response = null;
    try{
      dispatch(showLoader());
      response = await getAllChats();
      dispatch(hideLoader()); 

      if(response.success){
        dispatch(setAllCurrentChats(response.data));
      }else{
        toast.error(response.message);
        window.location.href = '/login'
      }
    }catch(error){
      dispatch(hideLoader());
      navigate('/login')
    }
  }

  useEffect(() => {
    if (localStorage.getItem("token")) {
      //write a logic to get the current user details
      getLoggedInUser();
      getAllLoggedUsers();
      getAllCurrentUserChats();
    } else {
      navigate("/login");
    }
  }, []);
  return <div>{children}</div>;
};

export default ProtectedRoute;
