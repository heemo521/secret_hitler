import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';

// creates a new game with the given display name
// else the user can also input room id to join an existing game

// form components for the new game
function GameForm({ onCreateGame, onJoinGame }) {
  const [name, setName] = useState('');
  const [roomId, setRoomId] = useState('');

  const nameHandler = (e) => {
    setName(e.target.value);
  };
  const roomIdHandler = (e) => {
    setRoomId(e.target.value);
  };

  const createHandler = (e) => {
    e.preventDefault();
    onCreateGame({ enteredName: name });
  };
  const joinHandler = (e) => {
    e.preventDefault();
    onJoinGame({ enteredName: name, enteredRoomCode: roomId });
  };

  return (
    <div className="card">
      <div>
        <h4>Instructions:</h4>
        <p>
          To create a game, enter a display name. Or to join a game, enter the
          room code as well. To join a open public game, choose from the list
          below after entering a display name.
        </p>
      </div>
      <form className="form">
        <div className="control">
          <label htmlFor="name">Display Name</label>
          <input type="text" id="name" value={name} onChange={nameHandler} />
        </div>
        <div className="control">
          <label htmlFor="room_code">Room Code</label>
          <input
            type="text"
            id="room_code"
            value={roomId}
            onChange={roomIdHandler}
          />
        </div>
        <div className="actions">
          <button
            data-action="join"
            className="join-btn"
            disabled={name.length === 0 || roomId.length === 0}
            onClick={joinHandler}
          >
            Join Game
          </button>
          <button
            data-action="create"
            className="create-btn"
            onClick={createHandler}
            disabled={name.length === 0}
          >
            Create Game
          </button>
        </div>
      </form>
    </div>
  );
}

GameForm.propTypes = {
  onCreateGame: PropTypes.func.isRequired,
  onJoinGame: PropTypes.func.isRequired,
};

export default GameForm;
