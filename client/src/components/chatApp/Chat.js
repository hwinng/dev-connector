import React, { useState, useEffect } from "react";
import openSocket from "socket.io-client";
import { ChatIcon, ChatModal } from "../chat";

import "./styles.scss";
const Chat = () => {
  const [showChat, setShowChat] = useState(false);
  const toggleShowChat = () => setShowChat(!showChat);
  const [publicUsers, setPublicUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);

  const fetchMessages = async () => {
    try {
      const res = await fetch("/messages");
      if (res.status !== 200) {
        throw new Error("Failed to fetch messages");
      }
      const resData = await res.json();
      // Set reversed 10 messages
      setMessages(resData.messages.reverse());
    } catch (err) {
      setError(error);
    }
  };

  useEffect(() => {
    createSocketConnection();
    fetchMessages();
  }, []);
  const createSocketConnection = () => {
    const socket = openSocket("http://localhost:5000/");
    // init
    socket.on("init", (data) => {
      setPublicUsers(data.users);
    });
    // Message events
    socket.on("message event", (data) => {
      if (data.action === "add") {
        setMessages((prevMessages) => [...prevMessages, data.message]);
      }
    });
  };
  return (
    <div className='App'>
      {showChat ? (
        <ChatModal
          toggleShowChat={toggleShowChat}
          userCount={publicUsers.length}
          messages={messages}
        />
      ) : (
        <ChatIcon
          toggleShowChat={toggleShowChat}
          userCount={publicUsers.length}
        />
      )}
    </div>
  );
};
export default Chat;
