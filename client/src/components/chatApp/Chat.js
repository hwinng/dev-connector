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

  useEffect(() => {
    createSocketConnection();
    fetchMessages();
  }, []);
  const createSocketConnection = () => {
    const socket = openSocket(process.env.REACT_APP_FETCH_URL);
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
  const fetchMessages = async () => {
    try {
      const res = await fetch(process.env.REACT_APP_FETCH_URL + "/messages");
      if (res.status !== 200) {
        throw new Error("Failed to fetch messages");
      }
      const resData = await res.json();
      // Set reversed 10 messages
      setMessages(resData.messages.reverse());
    } catch (err) {
      setError(err);
    }
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
