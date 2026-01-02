import React from 'react'
import { IoMdStar } from 'react-icons/io';
import { IoPencil } from "react-icons/io5";
import { MdForwardToInbox, MdOutlineDrafts, MdOutlineKeyboardArrowDown, MdOutlineWatchLater } from "react-icons/md";
import { TbSend2 } from "react-icons/tb";
import { useDispatch } from 'react-redux';
import { setOpen } from '../redux/appSlice';
import "./Sidebar.css"
const sidebarItems = [
  {
    icon: <MdForwardToInbox size={'20px'} />,
    text: "Inbox"
  },
  {
    icon: <IoMdStar size={'20px'} />,
    text: "Starred"
  },
  {
    icon: <MdOutlineWatchLater size={'20px'} />,
    text: "Snoozed"
  },
  {
    icon: <TbSend2 size={'20px'} />,
    text: "Send"
  },
  {
    icon: <MdOutlineDrafts size={'20px'} />,
    text: "Drafts"
  },
  {
    icon: <MdOutlineKeyboardArrowDown size={'20px'} />,
    text: "More"
  },

]
const Sidebar = () => {
  const dispatch = useDispatch();
  return (
    <div className='sidebar'>
      <div className='compose-wrapper'>
        <button onClick={() => dispatch(setOpen(true))} className='compose-btn'>
          <IoPencil size={'20px'} />
          Compose
        </button>
      </div>
      <div className='sidebar-list'>
        {
          sidebarItems.map((item, index) => {
            return (
              <div className='sidebar-item'>
                {item.icon}
                <p className='sidebar-text'>{item.text}</p>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Sidebar