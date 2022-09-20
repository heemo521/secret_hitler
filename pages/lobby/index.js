import React from 'react';
import GameForm from '../../components/lobby/GameForm';
import GameList from '../../components/lobby/GameList';
import SecretOne from '../../public/secret1.jpg';
import SecretTwo from '../../public/secret2.jpg';
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

  const lorem = `
  Lorem ipsum dolor sit amet, 
  consectet  unde omnis, sed do eiusmod 
  tempor incididunt ut labore  et dolore 
  magna aliqua.
  `; //  # lorem ipsum 100

  const dummyGameData = [
    {
      id: 0, //url to the game
      gameType: 'secret_hitler', // separate game logic for separation of concerns and possible future integration of other board games
      title: 'dummy', //title of the game

      description: lorem, //description of the game if any
      players: players,
      image: SecretOne,
      maxPlayers: 10, //min 5 players and max 10 players
    },
    {
      id: 1, //url to the game
      gameType: 'secret_hitler',
      title: 'dummy2', //title of the game
      description: lorem, //description of the game if any
      players: players,
      image: SecretOne,
      maxPlayers: 8,
    },
    {
      id: 2, //url to the game
      gameType: 'secret_hitler',
      title: 'dummy3', //title of the game
      description: lorem, //description of the game if any
      players: players,
      image: SecretTwo,
      maxPlayers: 8,
    },
  ];

  // selecting a display game will prefill the game and attempt to submit the form
  // to navigate the user to the game, however if the display name has not been set,
  // then the form will fail and will display warning

  return (
    <div>
      {/* will look like a search bar */}
      <GameForm />
      <GameList games={dummyGameData} />
    </div>
  );
}

Lobby.propTypes = {};

export default Lobby;
