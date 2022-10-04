import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import { useUser } from '../../context/user-context';
import PropTypes from 'prop-types';

let socket;

function Chat(props) {
  const { name, nameHandler, roomId, roomIdHandler } = useUser();
  const [message, setMessage] = useState();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socketInitializer();
  }, []);

  const socketInitializer = async () => {
    await axios('/api/socket');
    socket = io();
    socket.on('newIncomingMessage', (msg) => {
      setMessages((curMsg) => [
        ...curMsg,
        { author: msg.author, message: msg.message },
      ]);
    });
  };

  return <div>Chat</div>;
}

Chat.propTypes = {};

export default Chat;
