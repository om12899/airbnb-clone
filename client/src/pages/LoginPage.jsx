import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { UserContext } from '../UserContext';

function LoginPage() {
  const [email, setEmail]= useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const{setUser}=useContext(UserContext);
  async function handleLoginSubmit(ev){
    ev.preventDefault();
    axios.post('/login',{email,password}, {withCredentials:true});
    try {
      const userInfo = await axios.post('/login',{email,password});
      setUser(userInfo);
      alert('login successful');

      setRedirect(true);
    } catch (error) {
      alert('login failed!!');
    }

  }
  if(redirect){
    return <Navigate to ={'/'}/>
  }
  return (
   
    

    <div className='mt-4 grow flex items-center justify-around mb-32'>
      <div>
      <h1 className='text-4xl text-center mb-4'>Login</h1>
      <form className='max-w-md mx-auto ' onSubmit={handleLoginSubmit}>
        <input type='email' 
        placeholder='your@email.com' 
        value={email}
        onChange={ev=>setEmail(ev.target.value)}
        ></input>
        <input type="password" 
        placeholder='Password'
        value={password}
        onChange={ev=>setPassword(ev.target.value)} />
        <button className='loginBtn'>Login</button>
        <div className='text-center py-2 text-gray-500'> Don't Have an account yet?
          <Link to={'/register'} className='underline text-black'>Register now</Link>
        </div>

        </form>
        </div>
    </div>
  )
}

export default LoginPage
