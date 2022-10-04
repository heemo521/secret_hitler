import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import { useUser } from '../../context/user-context';
import PropTypes from 'prop-types';
import ThemedButton from '../ui/ThemedButton';

//TODO: Need to refactor socket implemented here so we can use it for
// more than just a chat
let socket;

function Chat(props) {
  //this roomId should be used to send the message
  //to a specific room
  const { displayName, roomId } = useUser();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socketInitializer();
  }, []);

  // TODO: Move this socketInitializer outside
  const socketInitializer = async () => {
    await axios('/api/socket');
    socket = io();
    socket.on('connect', () => {
      console.log('connected to socket with id ' + socket.id);
    });
    socket.on('newMessage', (msg) => {
      setMessages((curMsg) => [
        ...curMsg,
        { author: msg.author, message: msg.message },
      ]);
    });
  };

  const messageInputHandler = (e) => {
    setMessage(e.target.value);
  };

  const sendMessage = async () => {
    socket.emit('createdMessage', {
      author: displayName,
      message,
      //TODO: roomId,send this to socket server
      // and only send to users connected to this room
    });
    setMessage('');
  };

  const keyPressHandler = (e) => {
    if (e.keyCode === 13 && message) sendMessage();
  };

  return (
    <div>
      <div style={{ backgroundColor: 'white', color: 'black' }}>
        <h2>Chat Box</h2>
        {messages.map((msg, i) => {
          return (
            <div key={i}>
              {msg.author} : {msg.message}
            </div>
          );
        })}
      </div>
      <div>
        <input
          type="text"
          onChange={messageInputHandler}
          value={message}
          onKeyUp={keyPressHandler}
          placeholder="Enter new message..."
        />
        <ThemedButton onClick={sendMessage}>Send</ThemedButton>
      </div>
    </div>
  );
}

Chat.propTypes = {};

export default Chat;
