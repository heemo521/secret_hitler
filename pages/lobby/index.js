import React, { useState, useEffect } from 'react';
import { MongoClient } from 'mongodb';

import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import GameForm from '../../components/lobby/GameForm';
import GameList from '../../components/lobby/GameList';

// import { dummyGameData } from '../../components/utils/dummyData';
import PropTypes from 'prop-types';

function Lobby({ games }) {
  const router = useRouter();
  // console.log(props.games.length

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

  const createGameHandler = async (enteredName) => {
    try {
      console.log('entering a new room as ' + enteredName);
      // send requeust to create a game to server with the name provided
      const res = await axios.post('/api/new-game', { userName: enteredName });
      const { data } = res;
      const { roomCode } = data;

      router.replace(`/rooms/${roomCode}`);
    } catch (err) {
      console.log(err);
      console.log('failed creating Game');
    }
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
      {games ? <GameList games={games} /> : null}
    </div>
  );
}

export async function getStaticProps(context) {
  // used during production build process
  // Redundant to fetch to the server
  // const list = await axios('/api/active-games');
  const client = await MongoClient.connect(process.env.MONGO_DB);
  const db = client.db();
  const gameCollection = db.collection('secret_hitler');

  const games = await gameCollection.find().toArray();
  client.close();

  // console.log(games);

  return {
    props: {
      games: [],
      // games: games.map((game) => ({
      //   id: game._id.toString(),
      //   roomCode: game.roomCode,
      //   player: game.userName,
      //   image: game.image,
      //   description: game.description,
      //   //TODO: createa a schema and later get the number of players registered here

      //   // players: game.players.length,
      // })),
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
  games: PropTypes.array.isRequired,
};

export default Lobby;
