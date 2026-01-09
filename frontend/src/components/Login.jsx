import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { setAuthUser } from '../redux/appSlice';
import "./Login.css"
const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }
  const submithandler = async (e) => {
    e.preventDefault();
    console.log(input);
    try {
      const res = await axios.post("http://localhost:8080/api/v1/user/login", input, {
        headers: {
          'Content-Type': "application/json"
        },
        withCredentials: true
      });
      if (res.data.success) {
        dispatch(setAuthUser(res.data.user))
        navigate("/");
        toast.success(res.data.message);
      }

    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message)
    }
  }
  return (
     <div>
      <div className='login-container'>
        <form onSubmit={submithandler} className='login-card'>
          <h1 className='login-title'>Login</h1>
          <input onChange={changeHandler} value={input.email} name='email' type='email' placeholder='Email' 
          className='login-input' />
          <input onChange={changeHandler} value={input.password} name='password' type='password' placeholder='Password'
           className='login-input' />
          <button type='submit' className='login-button'>Login</button>
          <p>Don't have an Account? <Link to={"/signup"} className='login-link'>SignUp</Link></p>
        </form>
      </div>
    </div>
  )
}

export default Login