import React from 'react';

import GameItem from './GameListItem';
import PropTypes from 'prop-types';
// return a list of games from props

function GameList({ games }) {
  return (
    <ul>
      {games.map((game) => (
        <GameItem id={game.id} key={game.id} game={game} />
      ))}
    </ul>
  );
}

GameList.propTypes = {};

export default GameList;
