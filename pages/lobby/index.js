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
      const { success, message, data } = res.data;
      const { roomCode } = data;

      if (!success) throw new Error(message);

      router.replace(`/rooms/${roomCode}`);
    } catch (err) {
      console.log('failed creating Game');
    }
  };

  const joinGameHandler = async ({ enteredName, enteredRoomCode }) => {
    try {
      const res = await axios.post(`/api/game/${enteredRoomCode}`, {
        newPlayer: enteredName,
      });
      const { success, message } = res.data;

      if (!success) throw new Error(message);

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
        <Link href="/">Take Me Back Home Please</Link>
        <GameForm
          onCreateGame={createGameHandler}
          onJoinGame={joinGameHandler}
        />
        {games.length > 0 ? <GameList games={games} /> : null}
      </div>
    </>
  );
}

export async function getStaticProps(context) {
  await dbConnect();

  const games = await Game.find({});

  console.log('games', games);

  return {
    props: {
      games: games.map((game) => ({
        id: game._id.toString(),
        host: game.host,
        players: game.userName,
        numOfCompletedRounds: game.numOfCompletedRounds,
        inProgress: game.inProgress,
      })),
    },
    revalidate: 1, // data is never older than 10 seconds
  };
}

Lobby.propTypes = {
  games: PropTypes.array.isRequired,
};

export default Lobby;
