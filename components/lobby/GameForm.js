import React, { useRef } from 'react';
import PropTypes from 'prop-types';

// creates a new game with the given display name
// else the user can also input room id to join an existing game

// form components for the new game
function GameForm({ onEnterGame }) {
  // user can join a room by typing in the room id
  // or by leaving it blank and selecting join game, which should prompt
  // the user to the lobby (shows open public games) or scheduled games calendar time etc.

  const displayNameRef = useRef();
  const roomCodeRef = useRef();

  function submitHandler(event) {
    event.preventDefault();

    // name should always be entered for any of the options
    const enteredName = displayNameRef.current.value;
    // need verification here for the room id if entered
    const enteredRoomCode = roomCodeRef.current.value || null;

    if (!enteredName || !enteredRoomCode) {
      return;
    }

    const gameData = {
      displayName: enteredName,
      roomCode: enteredRoomCode,
    };

    onEnterGame(gameData);
  }
  return (
    <div className="card">
      <form className="form" onSubmit={submitHandler}>
        <div className="control">
          <label htmlFor="name">Display Name</label>
          <input type="text" required id="name" ref={displayNameRef} />
        </div>
        <div className="control">
          <label htmlFor="room_code">Room Code</label>
          <input type="text" required id="room_code" ref={roomCodeRef} />
        </div>
        <div className="actions">
          <button>Join Game</button>
          <button>Create Game</button>
        </div>
      </form>
    </div>
  );
}
GameForm.propTypes = {};

export default GameForm;
