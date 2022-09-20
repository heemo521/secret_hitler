import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import WaitingRoom from '../../../components/rooms/WaitingRoom';
import GameBoard from '../../../components/game/GameBoard';
import PropTypes from 'prop-types';

function Game() {
  const router = useRouter();
  const [startGame, setStartGame] = useState(false);
  const [roomCodeValidity, setRoomCodeValidity] = useState(false);
  const { roomCode } = router.query;

  // use localstorage for now to save user data??

  useEffect(() => {
    // Make some query to the server to see if the room exists or if the game is already started etc.
    // should I allow spectator mode? Hmm...
    verifyRoomCode(roomCode);
  }, [roomCode]);

  function verifyRoomCode(roomCode) {
    //make sure that this room exists and this player is registered
    // if not registered then spectator?
    // axios(roomCode)
    console.log(roomCode);
    setRoomCodeValidity(true);
  }

  if (!roomCode || !roomCodeValidity) {
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

Game.propTypes = {};

export default Game;
