import React from 'react'
import { IoMdArrowBack, IoMdMore } from 'react-icons/io'
import { useNavigate, useParams } from 'react-router-dom'
import { BiArchiveIn } from "react-icons/bi";
import { MdDeleteOutline, MdKeyboardArrowLeft, MdKeyboardArrowRight, MdOutlineAddTask, MdOutlineDriveFileMove, MdOutlineMarkEmailUnread, MdOutlineReport, MdOutlineWatchLater } from 'react-icons/md';
import { useSelector } from 'react-redux';
import axios from 'axios';
import toast from 'react-hot-toast';
import "./Mail.css"
const Mail = () => {
    const navigate = useNavigate();
    const {selectedEmail} = useSelector(store => store.app);
    const params = useParams();
    const deletehandler = async ()=>{
        try{
            const res = await axios.delete(`http://localhost:8080/api/v1/email/${params.id}`,{withCredentials:true});
            toast.success(res.data.message);
            navigate("/")
        }catch(error){
            console.log(error)
        }
    }
    return (
         <div className='mail'>
            <div className='mail-header'>
                <div className='mail-actions'>
                    <div onClick={() => navigate("/")} className='icon-btn'>
                        <IoMdArrowBack size={'20px'}/>
                    </div>
                    <div className='icon-btn'>
                        <BiArchiveIn size={'20px'}/>
                    </div>
                    <div className='icon-btn'>
                        <MdOutlineReport size={'20px'} />
                    </div>
                    <div onClick={deletehandler} className='icon-btn'>
                        <MdDeleteOutline size={'20px'} />
                    </div>
                    <div className='icon-btn'>
                        <MdOutlineMarkEmailUnread size={'20px'} />
                    </div>
                    <div className='icon-btn'>
                        <MdOutlineWatchLater size={'20px'} />
                    </div>
                    <div className='icon-btn'>
                        <MdOutlineAddTask size={'20px'} />
                    </div>
                    <div className='icon-btn'>
                        <MdOutlineDriveFileMove size={'20px'} />
                    </div>
                    <div className='icon-btn'>
                        <IoMdMore size={'20px'} />
                    </div>

                </div>
                <div className='mail-pagination'>
                    <span>1 To 50</span>
                    <MdKeyboardArrowLeft size={'20px'} />
                    <MdKeyboardArrowRight size={'20px'} />
                </div>
            </div>
            <div className='mail-body'>
                <div className='mail-subject-row'>
                    <div className='mail-subject-left'>
                        <h1 className='mail-subject'>{selectedEmail?.subject}</h1>
                        <span className='mail-label'>Inbox</span>
                    </div>
                    <div className='mail-date'>
                        <p>{selectedEmail?.createdAt}</p>
                    </div>
                </div>
                <div className='mail-to'>
                    <h1>{selectedEmail?.to}</h1>
                    <span>To Me</span>
                </div>
                <div className='mail-message'>
                    <p>{selectedEmail?.message}</p>
                </div>
            </div>
        </div>
    )
}

export default Mail