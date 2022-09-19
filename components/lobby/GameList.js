import React from 'react';

import GameItem from './GameItem';
import PropTypes from 'prop-types';
// return a list of games from props

function GameList({ games }) {
  return (
    <ul>
      {games.map((game) => (
        <GameItem
          key={game.id}
          id={game.id}
          game={game.game} // TODO: sort by game etc.
          image={game.image}
          title={game.title}
          description={game.description}
        />
      ))}
    </ul>
  );
}

GameList.propTypes = {
  games: PropTypes.array.isRequired,
};

export default GameList;
