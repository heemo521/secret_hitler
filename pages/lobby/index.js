import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { MongoClient } from 'mongodb';
import io from 'socket.io-client';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import GameForm from '../../components/lobby/GameForm';
import GameList from '../../components/lobby/GameList';

// import { dummyGameData } from '../../components/utils/dummyData';
import PropTypes from 'prop-types';

let socket;

function Lobby({ games }) {
  const router = useRouter();
  // console.log(props.games.length
  const [userName, setUserName] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  // useEffect(() => {
  //   socketInitializer();
  // }, []);

  // const socketInitializer = async () => {
  //   // call the server so that the socket server will be up and running
  //   await axios('/api/socket');

  //   socket = io();

  //   socket.on('newMessage', (message) =>
  //     setMessages((messages) => [
  //       ...messages,
  //       {
  //         author: message.author,
  //         message: message.message,
  //       },
  //     ])
  //   );
  // };

  const createGameHandler = async ({ enteredName }) => {
    try {
      const res = await axios.post('/api/newGame', { host: enteredName });
      const { data } = res;
      const { roomCode } = data;

      router.replace(`/rooms/${roomCode}`);
    } catch (err) {
      console.log('failed creating Game');
    }
  };

  const joinGameHandler = async ({ enteredName, enteredRoomCode }) => {
    try {
      const res = await axios.post('/api/joinGame', {
        roomCode: enteredRoomCode,
        newPlayer: enteredName,
      });

      console.log('join game', res);

      // router.replace(`/rooms/${roomCode}`);
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
