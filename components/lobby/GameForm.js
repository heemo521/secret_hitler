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
        return console.error('enter the room code to join a game?');
      return onJoinGame({ enteredName, enteredRoomCode }) && null;
    }

    onCreateGame(enteredName);
  }

  return (
    <div className="card">
      <form className="form">
        <div>
          <div>
            <div className="control">
              <label htmlFor="name">
                To create a new game, just create a display name =>
              </label>{' '}
              <input
                type="text"
                id="name"
                placeholder="Display Name"
                ref={displayNameRef}
              />
            </div>
            <div>
              <span>and then click on create game ==> </span>
              <button
                data-action="create"
                className="create-btn"
                onClick={submitHandler}
              >
                Create Game
              </button>
            </div>
          </div>
          <div>
            <div className="control">
              <label htmlFor="room_code">
                Or to join an existing game, fil out the room code here as well
                ==>
              </label>{' '}
              <input
                type="text"
                id="room_code"
                placeholder="Room Code"
                ref={roomCodeRef}
              />
            </div>
            <div>
              <span>and then click ==> </span>
              <button
                data-action="join"
                className="join-btn"
                onClick={submitHandler}
              >
                Join Game
              </button>
            </div>
          </div>
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
