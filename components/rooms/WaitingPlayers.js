import React from 'react';
import PropTypes from 'prop-types';

function WaitingPlayers({ host, players }) {
  //(H) to indicate that the player is the host.
  //TODO: The host should be able to designate the host
  return (
    <ol>
      {players.map((player) => {
        const isHost = player.name === host ? '(H) ' : '';

        return (
          <li key={player.id}>
            <p>- {isHost + player.name}</p>
          </li>
        );
      })}
    </ol>
  );
}

WaitingPlayers.propTypes = {};

export default WaitingPlayers;
