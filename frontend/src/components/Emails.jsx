import React, { useEffect } from 'react'
import Email from './Email'
import useGetAllEmails from '../hooks/useGetAllEmails'
import { useSelector } from 'react-redux';
import { useState } from 'react';

const Emails = () => {
  useGetAllEmails();
  const {emails, searchText} = useSelector(store => store.app)
  const [filteredEmails, setFilteredEmails] = useState(emails);

  useEffect(()=>{
    const filteredEmails = emails.filter((email)=>{
      return email.subject.toLowerCase().includes(searchText.toLowerCase()) || email.to.toLowerCase().includes(searchText.toLowerCase()) || email.message.toLowerCase().includes(searchText.toLowerCase())
    });
    setFilteredEmails(filteredEmails)
  },[searchText, emails])
  return (
    <div>
      {
        filteredEmails && filteredEmails?.map((email)=><Email key={email._id} email={email}/>)
      }
    </div>
  )
}

export default Emails