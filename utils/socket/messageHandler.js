export const messageHandler = (io, socket) => {
  const createMessage = (message) => {
    console.log('message', JSON.stringify(message));

    //the broadcast will only hit the other users
    socket.broadcast.emit('newMessage', message);
  };

  socket.on('createdMessage', createMessage);
};
