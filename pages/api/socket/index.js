import { MongoClient } from 'mongodb';
import { Server } from 'socket.io';

async function SocketHandler(req, res) {
  try {
    //TODO: We will be connecting to this api endpoint for the socket connection to the client rooms page with same room code id.
    console.log(res.socket);

    if (res.socket.server.io) {
      console.log('Socket is already set up!');
      return res.end();
    }
    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    const messageHandler = (io, socket) => {
      const createMessage = (message) => {
        socket.broadcast.emit('newMessage', message);
      };

      socket.on('createMessage', createMessage);
    };

    const onConnection = (socket) => {
      messageHandler(io, socket);
    };

    io.on('connection', onConnection);

    console.log('Socket in progress');
    res.end();
    // res.status(201).json({
    //   message: 'Say hello to socket api!',
    //   playerRegistered,
    // });
  } catch (error) {
    //either the roomcode was not found or some other error
    console.log(error);
    res.status(404).json({
      message: 'The Socket Server is not available',
    });
  }
}

export default SocketHandler;
