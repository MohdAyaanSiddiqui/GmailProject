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
                //withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message)
                navigate("/login");
            }

        } catch (error) {
            console.log("Axios Error", error);
            const message = error.response?.data?.message || error.message || "Server Not Responding";
            toast.error(message)
        }
    }
    return (
        /*
         <div className='signup-wrapper'>
            <form onSubmit={submithandler} className='signup-form'>
                <h1 className='signup-title'>SignUp</h1>
                <input onChange={changeHandler} value={input.fullname} name='fullname' type='text' placeholder='Name' className='signup-input' />
                <input onChange={changeHandler} value={input.email} name='email' type='email' placeholder='Email' className='signup-input' />
                <input onChange={changeHandler} value={input.password} name='password' type='password' placeholder='Password' className='signup-input' />
                <button type='submit' className='signup-btn'>SignUp</button>
                <p className='signup-text'>Already have an Account? <Link to={"/login"} className='signup-link'>Login</Link></p>
            </form>
        </div>*/
        <form
            onSubmit={submithandler}
            className="sm:w-87.5 w-full text-center bg-gray-900 border border-gray-800 rounded-2xl px-8">
            <h1 className="text-white text-3xl mt-10 font-medium">
                {state === "login" ? "Login" : "Sign up"}
            </h1>

            <p className="text-gray-400 text-sm mt-2">Please SignUp to continue</p>

            {state !== "login" && (
                <div className="flex items-center mt-6 w-full bg-gray-800 border border-gray-700 h-12 rounded-full overflow-hidden pl-6 gap-2 ">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-gray-400" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> <circle cx="12" cy="8" r="5" /> <path d="M20 21a8 8 0 0 0-16 0" /> </svg>
                    <input type="text" name="name" placeholder="Name" className="w-full bg-transparent text-white placeholder-gray-400 border-none outline-none " value={input.name} onChange={changeHandler} required />
                </div>
            )}

            <div className="flex items-center w-full mt-4 bg-gray-800 border border-gray-700 h-12 rounded-full overflow-hidden pl-6 gap-2 ">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-gray-400" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" /> <rect x="2" y="4" width="20" height="16" rx="2" /> </svg>
                <input type="email" name="email" placeholder="Email id" className="w-full bg-transparent text-white placeholder-gray-400 border-none outline-none " value={input.email} onChange={changeHandler} required />
            </div>

            <div className=" flex items-center mt-4 w-full bg-gray-800 border border-gray-700 h-12 rounded-full overflow-hidden pl-6 gap-2 ">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-gray-400" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> <rect width="18" height="11" x="3" y="11" rx="2" ry="2" /> <path d="M7 11V7a5 5 0 0 1 10 0v4" /> </svg>
                <input type="password" name="password" placeholder="Password" className="w-full bg-transparent text-white placeholder-gray-400 border-none outline-none" value={input.password} onChange={changeHandler} required />
            </div>

            <button type="submit" className="mt-2 w-full h-11 rounded-full text-white bg-indigo-600 hover:bg-indigo-500 transition " >
                {state === "login" ? "Login" : "Sign up"}
                <p>Already have an Account? <Link to={"/login"} className="text-gray-400 text-sm mt-3 mb-11 cursor-pointer">Login</Link></p>
            </button>

        </form>
    )
}

export default SignUp