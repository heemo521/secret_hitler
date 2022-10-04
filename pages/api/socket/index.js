import { Server } from 'socket.io';
import { messageHandler } from '../../../utils/socket/messageHandler';
function SocketHandler(req, res) {
  try {
    //TODO: We will be connecting to this api endpoint for the socket connection to the client rooms page with same room code id.
    //TODO: Need to persist user data somehow so the
    // name does not get reset when the user
    // refreshes the page or etc.
    if (res.socket.server.io) {
      console.log('Socket is already set up!');
      res.end();
      return;
    }

    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    // find a way to emit the message to the
    // specific room using the room code
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
