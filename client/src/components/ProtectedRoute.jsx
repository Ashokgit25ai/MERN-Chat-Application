import { useEffect  } from "react";
import { useNavigate } from "react-router-dom";
import { getLoggedUser, getAllUsers } from "../pages/apiCalls/users";
import { getAllChats } from "../pages/apiCalls/chat";
import { useDispatch } from "react-redux";
import { hideLoader, showLoader } from "../redux/loaderSlice";
import toast from "react-hot-toast";
import {
  setUser,
  setAllUsers,
  setAllCurrentChats,
  setSelectedChats,
} from "../redux/userSlice";

const ProtectedRoute = ({ children }) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // GET LOGGED USER
  const getLoggedInUser = async () => {
   
    try {
      dispatch(showLoader());
      const response = await getLoggedUser();
      dispatch(hideLoader());

      if (response.success) {
        dispatch(setUser(response.data));
      } else {
        toast.error(response.message)
        window.location.href = '/login'
      }
    } catch {
      dispatch(hideLoader());
      navigate("/login");
    }
  };


  // GET ALL LOGGED USERS
  const getAllLoggedUsers = async () => {
    
    try{
    dispatch(showLoader());
    const response = await getAllUsers();
    dispatch(hideLoader());

    if (response.success){
      dispatch(setAllUsers(response.data));
    }else{
      toast.error(response.message);
      window.location.href = '/login'
    }

    }catch {
      dispatch(hideLoader());
      navigate('/login')
    }
  };
  
  //GET ALL CHATS CONNECTED WITH CURRENT USER
  const getAllCurrentUserChats = async () => {
    try{
      dispatch(showLoader());
      const response = await getAllChats();
      dispatch(hideLoader()); 

      if(response.success){
        dispatch(setAllCurrentChats(response.data));
        const selectedChatId = sessionStorage.getItem("selectedChatId");
        const selectedChat = response.data.find(
          (chat) => chat._id === selectedChatId,
        );

        if (selectedChat) {
          dispatch(setSelectedChats(selectedChat));
        } else if (selectedChatId) {
          sessionStorage.removeItem("selectedChatId");
        }
      }else{
        toast.error(response.message);
        window.location.href = '/login'
      }
    }catch {
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
