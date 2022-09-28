import React from 'react';
import Head from 'next/head';
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

  const createGameHandler = async (enteredName) => {
    try {
      const res = await axios.post('/api/new-game', { userName: enteredName });
      //TODO: Update the page with loading spinner or something
      const { data } = res;
      const { roomCode } = data;

      router.replace(`/rooms/${roomCode}`);
    } catch (err) {
      //TODO: Handle error somehow
      console.log('failed creating Game');
    }
  };

  const joinGameHandler = async ({ enteredName, enteredRoomCode }) => {
    // Call to api route to registerPlayer to a existing room using roomCode

    // selecting a display game will prefill the game and attempt to submit the form
    // to navigate the user to the game, however if the display name has not been set,
    // then the form will fail and will display warning
    try {
      console.log('entering the room as ' + enteredName);
      console.log('room code is ', enteredRoomCode);

      const playerData = {
        enteredName,
        roomCode,
      };

      const res = await axios('/api/joinGame', playerData);

      console.log('join game', res);

      router.replace(`/rooms/${roomCode}`);
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
