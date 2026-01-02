import React, { useState } from 'react'
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from 'react-redux';
import { setEmails, setOpen } from '../redux/appSlice';
import toast from 'react-hot-toast';
import axios from 'axios';
import "./SendEmail.css"
const SendEmail = () => {
  const [formData, setFormData] = useState({
    to: "",
    subject: "",
    message: "",
  });
  const { open } = useSelector(store => store.app);
  const dispatch = useDispatch();

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/email/create",
        {
          to: formData.to,
          subject: formData.subject,
          message: formData.message
        },
        {
          withCredentials: true
        }
      );

      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error");
    }
  };
  return (
    <div className={`${open ? "compose-open":"compose-hidden"} compose-wrapper`}>
      <div className='compose-header'>
        <h1>New Message</h1>
        <div onClick={() => dispatch(setOpen(false))} className='compose-close'>
          <RxCross2 size={'20px'} />
        </div>
      </div>
      <form onSubmit={submitHandler} className='compose-form'>
        <input onChange={changeHandler} value={formData.to} name='to' type='text' placeholder='To' className='compose-imput' />
        <input onChange={changeHandler} value={formData.subject} name='subject' type='text' placeholder='Subject' className='compose-input' />
        <textarea onChange={changeHandler} value={formData.message} name='message' rows={'10'} cols={'30'} className='compose-textarea' ></textarea>
        <button type='submit' className='compose-send'>Send</button>
      </form>
    </div>
  )
}

export default SendEmail