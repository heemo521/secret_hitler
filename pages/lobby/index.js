import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import dbConnect from '../../utils/dbConnect';
import Game from '../../models/game';
import io from 'socket.io-client';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import GameForm from '../../components/lobby/GameForm';
import GameList from '../../components/lobby/GameList';
import PropTypes from 'prop-types';

function Lobby({ games }) {
  const router = useRouter();

  const createGameHandler = async ({ enteredName }) => {
    try {
      //FIXME: Prevent double click...

      const res = await axios.post('/api/game', { host: enteredName });
      const { roomCode } = res.data.data;

      router.replace(`/rooms/${roomCode}`);
    } catch (err) {
      console.log('failed creating Game');
    }
  };

  const joinGameHandler = async ({ enteredName, enteredRoomCode }) => {
    try {
      const res = await axios.patch(`/api/game/${enteredRoomCode}`, {
        newPlayer: enteredName,
      });
      console.log(res);

      router.replace(`/rooms/${enteredRoomCode}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Head>
        <title>Secret Hitler Game Lobby</title>
      </Head>
      <div>
        <h2>
          <Link href="/">Take Me Back Home Please</Link>
        </h2>

        <GameForm
          onCreateGame={createGameHandler}
          onJoinGame={joinGameHandler}
        />
        {games ? <GameList games={games} /> : null}
      </div>
    </>
  );
}

export async function getStaticProps(context) {
  dbConnect();
  // used during production build process
  // Redundant to fetch to the server
  // const list = await axios('/api/active-games');

  const games = await Game.find({});

  console.log(games);

  return {
    props: {
      games: [],
      // games: games.map((game) => ({
      //   id: game._id.toString(),
      //   roomCode: game.roomCode,
      //   player: game.userName,
      //   image: game.image,
      //   description: game.description,
      //   //TODO: create a a schema and later get the number of players registered here

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
