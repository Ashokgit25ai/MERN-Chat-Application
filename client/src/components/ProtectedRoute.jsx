import React, { useEffect , useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getLoggedUser } from '../pages/apiCalls/users';

const ProtectedRoute = ({children}) => {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);

    const getLoggedInUser = async () => {
      let response = null;
      try{
        response = await getLoggedUser();
        if (response.success){
          setUser(response.data);
        }else{
          navigate('/login');
        }
      }catch(error){
        navigate('/login');
      }
    };

    useEffect(() => {
       if (localStorage.getItem('token')){
        //write a logic to get the current user details
        getLoggedInUser();

       }else{
        navigate('/login');
       }
    });
  return (
    <div>
      <p>{`Email: ${user?.email}`}</p>
      <p>{`username: ${user?.firstname} ${user?.lastname}`}</p>
      {children}
    </div>
  )
}

export default ProtectedRoute;
