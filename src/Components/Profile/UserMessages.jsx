import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Message from './Message'
import { useTranslation } from 'react-i18next';


export default function UserMessages(props) {

  const {t} = useTranslation();
  const {id} = props
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  
  async function getUserMessages() {
    setLoading(true)
    let {data} = await axios.get(`https://sarahabackend.onrender.com/message/${id}`, {
    });
    setMessages(data.messages);
    setLoading(false)
  }


  async function sendMessage(e) 
  {
    e.preventDefault();
    
    try 
    {
      let { data } = await axios.post("https://sarahabackend.onrender.com/message", {message, id});
      
      if (data.message === "success") {
        setMessage("");
        document.getElementById("error").classList.replace("d-block", "d-none");
        document.getElementById("sent").classList.replace("d-none", "d-block");
        getUserMessages()
      }
    } catch (error) {
      document.getElementById("error").classList.replace("d-none", "d-block");
      document.getElementById("sent").classList.replace("d-block", "d-none");
    }
  }

  useEffect(() => {
    getUserMessages();
}, []);

  return (
    <>
    <div className='px-3'>
      <div className=" bg-white p-5 rounded-2 shadow-sm">
            
        <p className="text-center text-black pt-2 fs-6">
          {t("leaveMessage")}
        </p>
        <form onSubmit={sendMessage}>
          <textarea
            id="message"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            className="w-100 message-input mb-2"
            rows="6"
          ></textarea>
          <button className="bg-main w-100 rounded-5 py-2 sign">
            {t("send")}
          </button>
          <p id="error" className="text-danger d-none text-center pt-2">
            {t("messageFail")}
          </p>
          <p id="sent" className="text-main d-none text-center pt-2">
            {t("messageSuccess")}
          </p>
        </form>
      </div>
      <div className='rounded-2'>
          <div className='bg-white p-3 fs-4 text-center my-4 shadow-sm fw-light'><i className="fa-solid fa-message pe-2"></i> {t('messages')}</div>
          { messages.map((msg,index) => (
           msg.isShown ? 
          <Message key={msg._id}
              id={msg._id}
              message={msg.message} 
              date={msg.createdAt} 
              isShown={msg.isShown} 
              ip={msg.ip} 
              userAgent={msg.userAgent} 
              getUserMessages={getUserMessages}/>
              : null
          ))} 
      </div>
    </div>
    </>
  )
}
