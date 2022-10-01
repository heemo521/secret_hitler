import React from 'react';
import PropTypes from 'prop-types';

function WaitingRoom({ onStartGame, gameData }) {
  //extract players here after schema and etc.
  const { roomCode, host, players } = gameData;
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
      {/* Copy button for the user, maybe create a custom message to invite game with a link */}
      <h1>Waiting Room</h1>
      <h2>Room Code: {roomCode}</h2>
      <p>Waiting for other players...</p>
      {/* Waiting for the game master to start the game... (if at least 5) */}
      <ol>
        {players.map((player) => {
          console.log(player);
          return (
            <li key={player.id}>
              <p>{player.name}</p>
            </li>
          );
        })}
      </ol>
      {/* TODO: this button should only be visible to the game master  */}
      <button disabled={players.length >= 5} onClick={onStartGame}>
        Start the game
      </button>
    </div>
  );
}

WaitingRoom.propTypes = {
  onStartGame: PropTypes.func.isRequired,
  gameData: PropTypes.object.isRequired,
};

export default WaitingRoom;
