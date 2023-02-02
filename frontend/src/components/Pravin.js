import React, { useEffect, useState } from 'react'
import axios from 'axios'
export default function Pravin() {
    const [chats, setChats] = useState([]);
    const fun = async() =>
    {
        const {data}= await axios.get("/api/chat");
        setChats(data);
    }
    useEffect(() => {
        fun();
    }, []);
  return (
      <div>
          {
              chats.map((chat) =>
              (
                      <div key={chat._id}>
                          {chat.sender.name}
                      </div>
              ))}
    </div>
  )
}
