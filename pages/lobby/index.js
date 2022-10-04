import React from 'react';
import Head from 'next/head';
import dbConnect from '../../utils/dbConnect';
import Game from '../../models/game';
import { useUser } from '../../context/user-context';
import axios from 'axios';
import { useRouter } from 'next/router';
import GameForm from '../../components/lobby/GameForm';
import GameList from '../../components/lobby/GameList';
import PropTypes from 'prop-types';

function Lobby({ games }) {
  const router = useRouter();
  const { displayNameHandler } = useUser();
  const createGameHandler = async ({ enteredName }) => {
    try {
      //FIXME: Prevent double click...
      //TODO: Later implement private games, so that we don't list it on the lobby
      const res = await axios.post('/api/game', { host: enteredName });
      const { success, message, data } = res.data;
      const { roomCode } = data;

      if (!success) throw new Error(message);

      displayNameHandler();

      router.replace(`/rooms/${roomCode}`);
    } catch (err) {
      console.log(err.message);
    }
  };

  const joinGameHandler = async ({ enteredName, enteredRoomCode }) => {
    try {
      const res = await axios.post(`/api/game/${enteredRoomCode}`, {
        newPlayer: enteredName,
      });
      const { success, message } = res.data;

      if (!success) throw new Error(message);

      displayNameHandler();

      router.replace(`/rooms/${enteredRoomCode}`);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      <Head>
        <title>Secret Hitler Game Lobby</title>
      </Head>
      <div>
        <button onClick={() => router.push('/')}>Back</button>
        <GameForm
          onCreateGame={createGameHandler}
          onJoinGame={joinGameHandler}
        />
        {games.length > 0 && <GameList games={games} />}
      </div>
    </>
  );
}

export async function getStaticProps(context) {
  await dbConnect();
  const games = await Game.find({});

  return {
    props: {
      games: games.map((game) => ({
        id: game._id.toString(),
        host: game.host,
        players: game.players.map((player) => ({
          id: player._id.toString(),
          name: player.name,
          role: player.role,
        })),
        numOfCompletedRounds: game.numOfCompletedRounds,
        isInProgress: game.isInProgress,
      })),
    },
    revalidate: 1, // data is never older than 10 seconds
  };
}

Lobby.propTypes = {
  games: PropTypes.array.isRequired,
};

export default Lobby;
