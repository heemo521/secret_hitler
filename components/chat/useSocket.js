import React, { useEffect, useState, createContext } from 'react';
import io from 'socket.io-client';
import axios from 'axios';

function useSocket() {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    let socketIO;

    axios('/api/socket').then(() => {
      socketIO = io({ reconnect: false });
      setSocket(socketIO);
    });

    function cleanUp() {
      if (socketIO) socketIO.disconnect();
    }

    return cleanUp();
  }, []);

  return socket;
}

export default useSocket;
