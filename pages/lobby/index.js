import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import GameForm from '../../components/lobby/GameForm';
import GameList from '../../components/lobby/GameList';
import { generateRoomWithoutSeparator } from '../../components/utils/roomNameGenerator';

import { dummyGameData } from '../../components/utils/dummyData';
import PropTypes from 'prop-types';

function Lobby({ lobbyList }) {
  const router = useRouter();
  // console.log(props.lobbyList.length

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

    //put this on server and send request with the game master

    async function createNewGameHandler(gameMaster, roomCode) {
      const response = await axios.post('/api/new-game', {
        gameMaster,
        roomCode,
      });

      console.log('api response: ', response);
    }

    do {
      roomCode = generateRoomWithoutSeparator();
      //   isValidAndRegistered = await axios('/api/v1/rooms/' + roomCode);
      isValidAndRegistered = roomCode in tempRegisteredGameHash;
      tryCount++;
    } while (!isValidAndRegistered && tryCount < 10);

    createNewGameHandler(enteredName, roomCode);

    // console.log(isValidAndRegistered && 'Room is Valid and Registered');
    // console.log('Room Code is ' + roomCode);
    // console.log('We will redirect the user to the game page shortly');

    // const playerRegistrationData = {
    //   enteredName,
    //   roomCode,
    //   gameMaster: true,
    // };

    // await registerPlayer(playerRegistrationData);

    // console.log('Player is registered');

    // await setTimeout(() => {
    //   router.push('/rooms/' + roomCode);
    // }, 3000);
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
    if (!enteredName || !enteredRoomCode)
      return console.error('Empty inputs!!!');
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
      {lobbyList ? <GameList games={lobbyList} /> : null}
    </div>
  );
}

export async function getStaticProps(context) {
  // used during production build process
  // const list = await axios('/game-list')
  return {
    props: {
      lobbyList: dummyGameData,
    },
    revalidate: 1, // data is never older than 10 seconds
  };
}

// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;
//   //runs on server after deployment
//   return {
//     props: {
//       lobbyList: dummyGameData,
//     },
//   };
// }

Lobby.propTypes = {
  lobbyList: PropTypes.array.isRequired,
};

export default Lobby;
