import React from 'react';
import PropTypes from 'prop-types';
import WaitingPlayers from './WaitingPlayers';

/*TODO: Copy button for the user, maybe create a custom message to invite game with a link */

/* TODO: this button should only be visible to the game master  */

function WaitingRoom({ onStartGame, gameData }) {
  const { roomCode, host, players } = gameData;
  const numOfPlayers = players.length;
  const gameStatus =
    numOfPlayers > 5 ? 'Waiting for other players...' : 'Ready to start';

  return (
    <div>
      <h1>Waiting Room</h1>
      <h2>Room Code: {roomCode}</h2>
      <p>{gameStatus}</p>
      <WaitingPlayers host={host} players={players} />
      <button disabled={players.length < 5} onClick={onStartGame}>
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
