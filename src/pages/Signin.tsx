import React, { useContext, useState } from 'react'
import {  auth } from '../firebase/Setup'
import { signInWithEmailAndPassword } from 'firebase/auth'
import olx from '../assets/olx.png'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AuthContext } from '../store/Conrext'

const Signin = () => {
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const {setUser} = useContext(AuthContext)
  const navigate = useNavigate()
  const location = useLocation();
console.log('fdghdf',location.state);
  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("User ID:", userCredential.user.uid);
        setUser(userCredential.user.uid)
        console.log('succes');
        navigate('/create')
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
    <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h1 className='font-semibold text-2xl pb-9 uppercase'>Sign IN</h1>
      <div className="flex justify-center mb-4">
        <img
          src={olx}
          alt="Logo"
          className="w-24 h-24 rounded-full"
        />
      </div>
      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <label htmlFor="email" className="block font-semibold mb-2">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-slate-300 rounded-xl"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block font-semibold mb-2">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-slate-300 rounded-xl"
          />
        </div>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full">
          Login
        </button>
      </form>
    
      <Link className="underline" to="/signup">Sign UP</Link>

    </div>
  </div>
);
}

export default Signin
