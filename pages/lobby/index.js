import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import GameForm from '../../components/lobby/GameForm';
import GameList from '../../components/lobby/GameList';
import { generateRoomWithoutSeparator } from '../../components/utils/roomNameGenerator';

import { dummyGameData } from './dummyData';
// import PropTypes from 'prop-types';

function Lobby() {
  const router = useRouter();
  const tempRegisteredGameHash = {
    gameMaster: '',
    MyApp: ['player1'],
  };

  const registerPlayer = async (playerRegistrationData) => {
    const { enteredName, roomCode, gameMaster } = playerRegistrationData;
    // player registered
    if (gameMaster) {
      tempRegisteredGameHash[gameMaster] = enteredName;
      tempRegisteredGameHash[roomCode] = tempRegisteredGameHash[roomCode] || [];
    }

    tempRegisteredGameHash[roomCode].push(enteredName);
    return true;
  };

  const verifyAndRegister = async (enteredName) => {
    // verify that this room code does not already exist and register it to the server
    // once that is done, then redirect the user to the game page  do {
    let roomCode;
    let isValidAndRegistered;
    let tryCount = 0;

    do {
      roomCode = generateRoomWithoutSeparator();
      //   isValidAndRegistered = await axios('/api/v1/rooms/' + roomCode);
      isValidAndRegistered = roomCode in tempRegisteredGameHash;
      tryCount++;
    } while (!isValidAndRegistered && tryCount < 10);

    console.log(isValidAndRegistered && 'Room is Valid and Registered');
    console.log('Room Code is ' + roomCode);
    console.log('We will redirect the user to the game page shortly');

    const playerRegistrationData = {
      enteredName,
      roomCode,
      gameMaster: true,
    };

    await registerPlayer(playerRegistrationData);

    console.log('Player is registered');

    await setTimeout(() => {
      router.push('/rooms/' + roomCode);
    }, 3000);
  };

  const verifyAndRedirect = async (enteredName, roomCode) => {
    const playerRegistrationData = {
      enteredName,
      roomCode,
      gameMaster: false,
    };

    await registerPlayer(playerRegistrationData);

    await setTimeout(() => {
      router.push('/rooms/' + roomCode);
    }, 3000);
  };

  const createGameHandler = (enteredName) => {
    console.log('entering a new room as ' + enteredName);

    verifyAndRegister(enteredName);
  };

  const enterGameHandler = ({ enteredName, enteredRoomCode }) => {
    console.log('entering the room as ' + enteredName);
    console.log('room code is ', enteredRoomCode);
    verifyAndRedirect(enteredName, enteredRoomCode);
  };

  // selecting a display game will prefill the game and attempt to submit the form
  // to navigate the user to the game, however if the display name has not been set,
  // then the form will fail and will display warning

  return (
    <div>
      <h2>
        <Link href="/"> Take Me Back Home Please</Link>
      </h2>
      {/* will look like a search bar */}

      <GameForm
        onCreateGame={createGameHandler}
        onJoinGame={enterGameHandler}
      />
      <GameList games={dummyGameData} />
    </div>
  );
}

// Lobby.propTypes = {};

export default Lobby;
