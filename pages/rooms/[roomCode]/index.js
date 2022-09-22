import React, { useState } from 'react';
import WaitingRoom from '../../../components/rooms/WaitingRoom';
import GameBoard from '../../../components/game/GameBoard';
import PropTypes from 'prop-types';

function Game({ roomCode, isRoomCodeValid }) {
  const [startGame, setStartGame] = useState(false);

  // use localstorage for now to save user data??

  if (!roomCode || !isRoomCodeValid) {
    return <h1>this room does not exist fool!!!</h1>;
  }

  if (!startGame) {
    return <WaitingRoom roomCode={roomCode} />;
  }

  return (
    <div>
      <h1>Game Board</h1>
      <GameBoard />
    </div>
  );
}

export function getStaticProps(context) {
  const roomCode = context.params.roomCode;

  function verifyRoomCode(roomCode) {
    //make sure that this room exists and this player is registered
    // if not registered then spectator?
    // axios(roomCode)

    return true;
  }

  console.log(roomCode);
  const isRoomCodeValid = verifyRoomCode(roomCode);

  // Make some query to the server to see if the room exists or if the game is already started etc.
  // should I allow spectator mode? Hmm...
  // verifyRoomCode(roomCode);
  return {
    props: {
      roomCode,
      isRoomCodeValid,
    },
    revalidate: 1,
  };
}

Game.propTypes = {};

export default Game;
