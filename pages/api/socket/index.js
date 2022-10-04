import { Server } from 'socket.io';

function SocketHandler(req, res) {
  try {
    //TODO: We will be connecting to this api endpoint for the socket connection to the client rooms page with same room code id.

    if (res.socket.server.io) {
      console.log('Socket is already set up!');
      res.end();
      return;
    }

    // if (res.socket.server.io) return res.end();

    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    const messageHandler = (io, socket) => {
      const createMessage = (message) => {
        console.log('message', JSON.stringify(message));
        socket.broadcast.emit('newMessage', message);
      };

      socket.on('createdMessage', createMessage);
    };

    const onConnection = (socket) => {
      messageHandler(io, socket);
    };

    io.on('connection', onConnection);

    console.log('Socket in progress');
    res.end();
  } catch (error) {
    console.log('socket error ', error.message);
    res.status(404).json({
      message: 'The Socket Server is not available',
    });
  }
}

export default SocketHandler;
