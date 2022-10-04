import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import axios from 'axios';

function useSocket(url) {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    let socketIO;

    axios('/api/socket').then(() => {
      socketIO = io();
      setSocket(socketIO);
    });
    function cleanUp() {
      if (socketIO) socketIO.disconnect();
    }

    return cleanUp();
  }, []);

  return socket;
}

useSocket.propTypes = {};

export default useSocket;
