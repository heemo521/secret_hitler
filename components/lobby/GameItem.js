import React from 'react';
import Link from 'next/Link';
import PropTypes from 'prop-types';

function GameItem({ game }) {
  return (
    <li>
      <Link href={`/${game.id}`}>{game.name}</Link>
    </li>
  );
}

GameItem.propTypes = {};

export default GameItem;
