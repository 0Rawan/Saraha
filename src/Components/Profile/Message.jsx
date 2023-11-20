import axios from 'axios';
import React from 'react'
import { useTranslation } from 'react-i18next';


export default function Message(props) {
    const {t} = useTranslation();
    const {message,date} = props
    const messageDate = new Date(date);
    const formattedDate = `${messageDate.toLocaleDateString()} ${messageDate.toLocaleTimeString()}`;
  
   
  return (
    <div className='bg-white position-relative p-4 mb-4 my-2 border-main shadow-sm'>
      <p className='fs-5 fw-semibold'>{message}</p>
      <p className='text-secondary'>{formattedDate}</p>
    </div>
  )
}
