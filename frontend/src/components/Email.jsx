import React from 'react'
import { MdCropSquare } from 'react-icons/md'
import { RiStarLine } from "react-icons/ri";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSelectedEmails } from '../redux/appSlice';
import "./Email.css"
const Email = ({ email }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const openMail = () => {
        dispatch(setSelectedEmails(email))
        navigate(`/mail/${email._id}`)
    }
    return (
        <div onClick={openMail} className='email-row'>
            <div className='email-left'>
                <div className='email-left'>
                    <MdCropSquare size={'20px'} />
                </div>
                <div className='email-left'>
                    <RiStarLine size={'20px'} />
                </div>
                <div>
                    <h1 className='email-subject'>{email?.subject}</h1>
                </div>
            </div>
            <div className='email-message'>
                <p>{email?.message}</p>
            </div>
            <div className='email-createdAt'>
                <p>{email?.createdAt}</p>
            </div>
        </div>
    )
}

export default Email