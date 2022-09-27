import React, { useState } from 'react';
import { MongoClient, ObjectId } from 'mongodb';
import router from 'next/router';
import WaitingRoom from '../../../components/rooms/WaitingRoom';
import GameBoard from '../../../components/game/GameBoard';
import PropTypes from 'prop-types';

function Game({ gameData }) {
  const { roomCode } = gameData;
  const [startGame, setStartGame] = useState(false);

  const startGameHandler = () => {
    setStartGame(true);
  };
  // use localstorage for now to save user data??

  if (!roomCode || !isRoomCodeValid) {
    return <h1>this room does not exist fool!!!</h1>;
  }

  if (!startGame) {
    return <WaitingRoom onStartGame={startGameHandler} gameData={gameData} />;
  }

  return (
    <div>
      <h1>Game Board</h1>
      <GameBoard />
    </div>
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(process.env.MONGO_DB);
  const db = client.db();
  const gameCollection = db.collection('secret_hitler');
  const games = gameCollection.find({}, { _id: 1 }).toArray();
  client.close();

  return {
    fallback: true,
    paths: games.map((game) => ({
      params: { roomCode: game._id.toString() },
    })),
  };
  // paths: [
  //   {
  //     params: {
  //       roomCode: 'm1',
  //     },
  //   },
  //   {
  //     params: {
  //       roomCode: 'm2',
  //     },
  //   },
  // ],
}

export async function getStaticProps(context) {
  const roomCode = context.params.roomCode;

  const client = await MongoClient.connect(process.env.MONGO_DB);
  const db = client.db();
  const gameCollection = db.collection('secret_hitler');
  const selectedGame = await gameCollection.findOne({
    _id: ObjectId(roomCode),
  });

  client.close();

  console.log(roomCode);

  // Make some query to the server to see if the room exists or if the game is already started etc.
  // should I allow spectator mode? Hmm...
  // verifyRoomCode(roomCode);

  return {
    props: {
      gameData: selectedGame.map((game) => ({
        id: game._id,
        player: [],
      })),
    },
    revalidate: 1,
  };
}

Game.propTypes = {};

export default Game;
