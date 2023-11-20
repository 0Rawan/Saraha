import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import cover from '../../images/pic.jpg'
import { useTranslation } from 'react-i18next';
import { useNavigate, } from "react-router-dom";


  

export default function UserProfile(props) {


  const { t, i18n } = useTranslation();
  const [userData, setUserData] = useState(null);
  const {id} = props
  const navigate = useNavigate();

  
  async function getUsereData() {
    try 
    {
      let { data } = await axios.get(`https://sarahabackend.onrender.com/user/${id}`);
      if (data.message === "success") setUserData(data.user);
    } 
    catch (error) 
    {
      navigate("/error");
    }
  }

  useEffect(() => {getUsereData();}, []);


  return (
    <div className='px-3'>
        <div className='bg-white shadow-sm pb-3 rounded-2 overflow-hidden'>
            <div className='cover-height overflow-hidden'>
                <img src={cover} className='w-100 ' alt="" />
            </div>
            <div className='translate-middle-y'>
                <div className='bg-black img-thumbnail img-square rounded-circle overflow-hidden mx-auto mouse-pointer'>
                    <img className='w-100 mb-0 rounded-circle' src={`https://sarahabackend.onrender.com/${userData?.profilePic}`} alt="" />
                </div>
                <p className='text-center text-black pt-2 fs-6 fw-semibold'>{userData?.name}</p>
            </div>
        </div>
    </div>
  )
}
