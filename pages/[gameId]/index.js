import React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';

function Game() {
  const router = useRouter();
  const { gameId } = router.query;
  return <h1>Game ID: {gameId}</h1>;
}

Game.propTypes = {};

export default Game;
