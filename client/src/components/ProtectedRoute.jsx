import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getLoggedUser, getAllUsers } from "../pages/apiCalls/users";
import { useDispatch, useSelector } from "react-redux";
import { hideLoader, showLoader } from "../redux/loaderSlice";
import toast from "react-hot-toast";
import { setUser, setAllUsers } from "../redux/userSlice";

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
  

  useEffect(() => {
    if (localStorage.getItem("token")) {
      //write a logic to get the current user details
      getLoggedInUser();
      getAllLoggedUsers();
    } else {
      navigate("/login");
    }
  }, []);
  return <div>{children}</div>;
};

export default ProtectedRoute;
