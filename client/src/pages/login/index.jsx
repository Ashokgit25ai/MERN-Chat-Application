import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { loginUser } from '../apiCalls/auth';

const index = () => {
  const [user, setUser] = useState({
    email:'',
    password:''
  });

  const onLoginFormSubmit = async (event) =>{
    event.preventDefault();
    let response = null;
    try{
      response = await loginUser(user);
      if (response.success){
        alert(response.message);
        localStorage.setItem('token', response.token);
        window.location.href = '/';
      }else{
        return alert(response.message);
      }
    }catch(error){
      return alert(response.message);
    }
  };

  return (
    <div className='container'>
      <div className="container-back-img"></div>
      <div className="container-back-color"></div>
      <div className="card">
        <div className="card-title">
          <h1>Login Here</h1>
        </div>
        <div className="form" onSubmit={onLoginFormSubmit}>
          <form>
            <input type="email" placeholder='Email' value={user.email} 
              onChange={(e) => setUser({...user, email: e.target.value})} />
            <input type="password" placeholder='password' value={user.password} 
              onChange={(e) => setUser({...user, password: e.target.value})} />
            <button>Login</button>
          </form>
          <div className="card-terms">
            <span>Don't have an account yet?
               <Link to="/signup">Sign Up</Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default index
