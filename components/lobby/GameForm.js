import React, { useRef } from 'react';
import PropTypes from 'prop-types';

// creates a new game with the given display name
// else the user can also input room id to join an existing game

// form components for the new game
function GameForm({ onCreateGame, onJoinGame }) {
  // user can join a room by typing in the room id
  // or by leaving it blank and selecting join game, which should prompt
  // the user to the lobby (shows open public games) or scheduled games calendar time etc.

  const displayNameRef = useRef();
  const roomCodeRef = useRef();

  function submitHandler(event) {
    event.preventDefault();
    const selectedAction = event.target.dataset.action;
    // name should always be entered for any of the options
    const enteredName = displayNameRef.current.value;
    const enteredRoomCode = roomCodeRef.current.value;

    if (!enteredName) return console.error('can you enter the name at least?');

    if (selectedAction === 'join') {
      if (!enteredRoomCode)
        return console.error('can you enter the name at least?');

      return onJoinGame({ enteredName, enteredRoomCode }) && null;
    }

    onCreateGame(enteredName);
  }

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
          <input type="text" id="name" ref={displayNameRef} />
        </div>
        <div className="control">
          <label htmlFor="room_code">Room Code</label>
          <input type="text" id="room_code" ref={roomCodeRef} />
        </div>
        <div className="actions">
          <button
            data-action="join"
            className="join-btn"
            onClick={submitHandler}
          >
            Join Game
          </button>
          <button
            data-action="create"
            className="create-btn"
            onClick={submitHandler}
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
