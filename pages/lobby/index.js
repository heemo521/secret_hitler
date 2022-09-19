import React from 'react';
import PropTypes from 'prop-types';

function Lobby(props) {
  const players = [
    {
      id: 1,
      name: 'player 1',
    },
    {
      id: 2,
      name: 'player 2',
    },
    {
      id: 3,
      name: 'player 3',
    },
  ];
  const dummyGameData = [
    {
      id: 'dummy', //url to the game
      game: 'secret_hitler', // separate game logic for separation of concerns and possible future integration of other board games
      title: 'dummy', //title of the game
      description: 'dummy', //description of the game if any
      players: players,
      image: null,
      maxPlayers: 10, //min 5 players and max 10 players
    },
    {
      id: 'dummy2', //url to the game
      game: 'secret_hitler',
      title: 'dummy2', //title of the game
      description: 'dummy2', //description of the game if any
      players: players,
      image: null,
      maxPlayers: 8,
    },
    {
      id: 'dummy3', //url to the game
      title: 'dummy3', //title of the game
      description: 'dummy3', //description of the game if any
      players: players,
      image: null,
      maxPlayers: 8,
    },
  ];

  // list of games in the lobby and when clicked on details button, can see details on the players

  return <h1>Lobby</h1>;
}

Lobby.propTypes = {};

export default Lobby;
