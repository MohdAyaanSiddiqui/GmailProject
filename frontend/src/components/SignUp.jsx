import axios from 'axios';
import React from 'react'
import { useState } from 'react'
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom'
import "./SignUp.css"
const SignUp = () => {
    const [input, setInput] = useState({
        fullname: "",
        email: "",
        password: "",
    });

    const navigate = useNavigate();

    const changeHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }
    const submithandler = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:8080/api/v1/user/register", input, {
                headers: {
                    'Content-Type': "application/json"
                },
                withCredentials: true
            });
            if (res.data.success) {
                navigate("/login");
                toast.success(res.data.message);
            }

        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message)
        }
    }
    return (
         <div className='signup-wrapper'>
            <form onSubmit={submithandler} className='signup-form'>
                <h1 className='signup-title'>SignUp</h1>
                <input onChange={changeHandler} value={input.fullname} name='fullname' type='text' placeholder='Name' className='signup-input' />
                <input onChange={changeHandler} value={input.email} name='email' type='email' placeholder='Email' className='signup-input' />
                <input onChange={changeHandler} value={input.password} name='password' type='password' placeholder='Password' className='signup-input' />
                <button type='submit' className='signup-btn'>SignUp</button>
                <p className='signup-text'>Already have an Account? <Link to={"/login"} className='signup-link'>Login</Link></p>
            </form>
        </div>
    )
}

export default SignUp