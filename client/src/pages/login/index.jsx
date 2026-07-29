import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const index = () => {
  const [user, setUser] = useState({
    email:'',
    password:''
  });

  const onLoginFormSubmit = (event) =>{
    event.preventDefault();
    console.log(user);
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
