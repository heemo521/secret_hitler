import React from 'react';
import PropTypes from 'prop-types';

function WaitingRoom({ onStartGame, gameData }) {
  //extract players here after schema and etc.
  const { roomCode } = gameData;
  {
    // onStartGame should only be available to the Game
    // Master when there is at least five people in the game
    /* copy function here for users to invite with code*/
    // get players with room code and pull player information
    // from the local storage for now
    // connection to socket should update the list of players for this roomcode
  }

  return (
    <div>
      <h1>Room Code: {roomCode}</h1>
      <h2>Waiting for other players...</h2>
      {/* Waiting for the game master to start the game... (if at least 5) */}
      <ol>
        <li>Player1 Name</li>
        <li>Player2 Name</li>
        <li>Player3 Name</li>
        <li>Player4 Name</li>
        <li>Player5 Name</li>
      </ol>
      {/* TODO: this button should only be visible to the game master  */}
      <button onClick={onStartGame}>Start the game</button>
    </div>
  );
}

WaitingRoom.propTypes = {
  onStartGame: PropTypes.func.isRequired,
  gameData: PropTypes.object.isRequired,
};

export default WaitingRoom;
