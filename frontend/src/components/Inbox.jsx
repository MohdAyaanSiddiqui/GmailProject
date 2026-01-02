import React, { useState } from 'react'
import { FaCaretDown, FaUserFriends } from 'react-icons/fa'
import { IoMdMore } from 'react-icons/io'
import { IoRefresh } from 'react-icons/io5'
import { MdCropSquare, MdInbox, MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'
import { GoTag } from "react-icons/go";
import Emails from './Emails'
import "./Inbox.css"
const mailType = [
    {
        icon: <MdInbox size={'20px'} />,
        text: "Primary"
    },
    {
        icon: <GoTag size={'20px'} />,
        text: "Promotions"
    },
    {
        icon: <FaUserFriends size={'20px'} />,
        text: "Social"
    }
]
const Inbox = () => {
    const [selected, setSelected] = useState(0);
    return (
        <div className='inbox'>
            <div className='inbox-header'>
                <div className='inbox-icons'>
                    <div className='icon-btn'>
                        <MdCropSquare size={'20px'} />
                        <FaCaretDown size={'20px'} />
                    </div>
                    <div className='icon-btn'>
                        <IoRefresh size={'20px'} />
                    </div>
                    <div className='icon-btn'>
                        <IoMdMore size={'20px'} />
                    </div>
                </div>
                <div className='icon-btn'>
                    <span>1 To 50</span>
                    <MdKeyboardArrowLeft size={'20px'} />
                    <MdKeyboardArrowRight size={'20px'} />
                </div>
            </div>
            <div className='inbox-list'>
                <div className='inbox-scroll'>
                    {mailType.map((item, index) => {
                        return (
                            <button onClick={() => setSelected(index)} className={`inbox-nav-btn ${selected === index ? 'active':''}`}>
                                {item.icon}
                                <span>{item.text}</span>
                            </button>
                        )
                    })}
                </div>
                <Emails />
            </div>
        </div>
    )
}

export default Inbox