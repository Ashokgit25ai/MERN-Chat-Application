import {useState} from 'react';
import { Link } from 'react-router-dom';
import { signupUser } from '../apiCalls/auth';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { hideLoader, showLoader } from '../../redux/loaderSlice';

const Index = () => {

  const dispatch = useDispatch();

  const [user, setUser] = useState({
    firstname:'',
    lastname:'',
    email:'',
    password:''
  });
  
  
  const onFormSubmit = async (event) => {
    event.preventDefault();
    try{
      dispatch(showLoader());
      const response = await signupUser(user);
      dispatch(hideLoader());
      if (response?.success){
        toast.success(response.message);
      }else{
        toast.error(response.message);
      }
    } catch {
      dispatch(hideLoader());
      toast.error('Something went wrong');
    }
  };


  return (
    <div className='container'>
      <div className="container-back-img"></div>
      <div className="container-back-color"></div>
      <div className="card">
        <div className="card-title">
          <h1>Create Account</h1>
        </div>
        <div className="form">
          <form  onSubmit={onFormSubmit}>
            <div className="column">
              <input type="text" placeholder='First Name' value={user.firstname}
                onChange={(e) => setUser({...user, firstname: e.target.value})}/>
              <input type="text" placeholder='Last Name' value={user.lastname} 
                onChange={(e) => setUser({...user, lastname: e.target.value})}/>
            </div>
            <input type="email" placeholder='Email' value={user.email} 
               onChange={(e) => setUser({...user, email: e.target.value})}/>
            <input type="password" placeholder='Password' value={user.password}
               onChange={(e) => setUser({...user, password: e.target.value})} />
            <button type="submit">Sign Up</button>
          </form>
          <div className="card-terms">
            <span>Already have an account?
              <Link to='/login'>Login Here</Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Index;
