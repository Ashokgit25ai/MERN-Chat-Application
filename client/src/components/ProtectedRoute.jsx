import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getLoggedUser } from "../pages/apiCalls/users";
import { useDispatch, useSelector } from "react-redux";
import { hideLoader, showLoader } from "../redux/loaderSlice";
import toast from "react-hot-toast";
import { setUser } from "../redux/userSlice";

const ProtectedRoute = ({ children }) => {
  const { user } = useSelector(state => state.userReducer);

  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  useEffect(() => {
    if (localStorage.getItem("token")) {
      //write a logic to get the current user details
      getLoggedInUser();
    } else {
      navigate("/login");
    }
  }, []);
  return <div>{children}</div>;
};

export default ProtectedRoute;
