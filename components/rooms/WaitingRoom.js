import React from 'react';
import PropTypes from 'prop-types';

function WaitingRoom({ roomCode }) {
  {
    /* copy function here for users to invite with code*/
    // get players with room code and pull player information
    // from the local storage for now
  }

  return (
    <div>
      <h1>Room Code: {roomCode}</h1>
      <h2>Waiting for other players...</h2>
      {/* Waiting for the game master to start the game... (if at least 5) */}
      <ol>
        <li>Player1 Name</li>
        <li>Player2 Name</li>
      </ol>
    </div>
  );
}

WaitingRoom.propTypes = {};

export default WaitingRoom;
