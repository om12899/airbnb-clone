import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function registerPage() {
    const[name, setName] = useState('');
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    async function registerUser(ev){
        ev.preventDefault();
        //axios.get('/test');
       await axios.post('/register', {name, email, password});
       alert('Registeration Complete');
    }

  return (
    <div className='mt-4 grow flex items-center justify-around mb-32'>
    <div>
    <h1 className='text-4xl text-center mb-4'>Login</h1>
    <form className='max-w-md mx-auto ' onSubmit={registerUser}>
        <input type='text' placeholder='Name' value={name} onChange={ev=>setName(ev.target.value)}></input>
      <input type='email' placeholder='your@email.com' value={email} onChange={ev=>setEmail(ev.target.value)}></input>
      <input type="password" placeholder='Password' value={password} onChange={ev=>setPassword(ev.target.value)} />
      <button className='loginBtn'>Register</button>
      <div className='text-center py-2 text-gray-500'> Already an user?
        <Link to={'/login'} className='underline text-black'>Login </Link>
      </div>

      </form>
      </div>
  </div>
  )

  }

export default registerPage
