import React from 'react';
import PropTypes from 'prop-types';

function WaitingRoom({ onStartGame, gameData }) {
  //extract players here after schema and etc.
  const { roomCode, host, players } = gameData;
  const numOfPlayers = players.length;

  return (
    <div>
      {/* Copy button for the user, maybe create a custom message to invite game with a link */}
      <h1>Waiting Room</h1>
      <h2>Room Code: {roomCode}</h2>
      {numOfPlayers > 5 ? (
        <p>Waiting for other players...</p>
      ) : (
        <p>Ready to start</p>
      )}

      <ol>
        {players.map((player) => {
          return (
            <li key={player.id}>
              <p>{player.name}</p>
            </li>
          );
        })}
      </ol>
      {/* TODO: this button should only be visible to the game master  */}
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
