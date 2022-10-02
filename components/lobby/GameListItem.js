import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import secret1 from '../../public/secret1.jpg';
import PropTypes from 'prop-types';

function GameListItem({ game }) {
  const { id, host, inProgress, numOfCompletedRounds, players } = game;

  //TODO: idea for visualization of number of players (use the number of players
  // out of 10  )

  return (
    <li>
      <div style={{ display: 'flex', gap: 20, border: '1px solid white' }}>
        <Image
          src={secret1}
          alt={'Secret Hitler Game Image'}
          width={300}
          height={300}
        />
        <div>
          <p>Game Host: {host}</p>
          <p>Round {numOfCompletedRounds + 1}</p>
          {inProgress ? (
            <p>In Progress...</p>
          ) : (
            // TODO: Should let the player join using the join button (name must be filled)
            // Auto fill the room code or pass it down differently here.
            <button disabled={true}> Click to join!</button>
          )}
          <p>Players: {players.length} / 10</p>
        </div>
      </div>
    </li>
  );
}

GameListItem.propTypes = {};

export default GameListItem;
