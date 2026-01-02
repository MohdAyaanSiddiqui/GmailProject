import React, { useEffect, useState } from 'react'
import { GiHamburgerMenu } from "react-icons/gi";
import { CiSearch } from "react-icons/ci";
import { FaQuestion } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { PiDotsNineBold } from "react-icons/pi";
import Avatar from 'react-avatar';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthUser, setSearchText } from '../redux/appSlice';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import "./Navbar.css"
const Navbar = () => {
    const [text, setText] = useState("");
    const { user } = useSelector(store => store.app);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logouthandler = async () => {
        try {
            const res = await axios.get('http://localhost:8080/api/v1/user/logout', { withCredentials: true });
            console.log(res);
            toast.success(res.data.message);
            dispatch(setAuthUser(null));
            navigate("/login")
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        dispatch(setSearchText(text));
    }, [text])

    return (
            <div className='navbar'>
            <div className='navbar-left'>
                <div className='logo-wrapper'>
                    <div className='icon-btn'>
                        <GiHamburgerMenu />
                    </div>
                    <img className='logo-img' src='https://tse2.mm.bing.net/th/id/OIP.0h4TQl-kO-nl7gooZmkbbAHaFj?pid=Api&P=0&h=180' alt='Logo' />
                    <h1 className='logo-text'>Gmail</h1>
                </div>
            </div>
            {
                user && (
                    <>
                        <div className='search-container' >
                            <div className='search-box'>
                                <CiSearch size={'20px'} className='search-icon' />
                                <input type='text' value={text} onChange={(e) => setText(e.target.value)} placeholder='Search Mail'
                                 className='search-input' />
                            </div>
                        </div>
                        <div className='navbar-right'>
                            <div className='icon-btn'>
                                <FaQuestion size={'20px'} />
                            </div>
                            <div className='icon-btn'>
                                <IoMdSettings size={'20px'} />
                            </div>
                            <div className='icon-btn'>
                                <PiDotsNineBold size={'20px'} />
                            </div>
                            <span onClick={logouthandler} className='logout' >Logout</span>
                            <Avatar src={user.profilePhoto} size="40" round={true} />
                        </div>

                    </>
                )
            }
        </div>
    )
}

export default Navbar