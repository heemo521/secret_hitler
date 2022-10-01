import React, { useEffect, useState } from 'react';
import { MongoClient, ObjectId } from 'mongodb';
import WaitingRoom from '../../../components/rooms/WaitingRoom';
import GameBoard from '../../../components/game/GameBoard';
import axios from 'axios';
import PropTypes from 'prop-types';

//TODO: Implement chat here so that player scan see start chatting as soon as they enter the waiting room

function Game({ gameData, isValidGame }) {
  const [startGame, setStartGame] = useState(false);

  useEffect(() => {
    console.log(gameData.inProgress);
    setStartGame(gameData.inProgress);
  }, [gameData.inProgress]);

  //Room does not exist should redirect the user to the lobby room
  if (!isValidGame) {
    return <h1>this room does not exist fool!!!</h1>;
  }

  const startGameHandler = async () => {
    const res = await axios.patch('/api/startGame', {
      roomCode: gameData.roomCode,
    });
    if (res.status === 201) setStartGame(true);
  };

  if (!startGame) {
    return <WaitingRoom onStartGame={startGameHandler} gameData={gameData} />;
  }

  //When Game Starts, We'll redirect the users to the game room
  return <GameBoard gameData={gameData} />;
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(process.env.MONGO_DB);
  const db = client.db();
  const gameCollection = db.collection('secret_hitler');

  const games = await gameCollection.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    fallback: true,
    paths: games.map((game) => ({
      params: { roomCode: game._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  const roomCode = context.params.roomCode;

  const client = await MongoClient.connect(process.env.MONGO_DB);
  const db = client.db();
  const gameCollection = db.collection('secret_hitler');
  const [selectedGame] = await gameCollection
    .find({
      _id: ObjectId(roomCode),
    })
    .toArray();

  client.close();

  return {
    props: {
      isValidGame: selectedGame !== undefined,
      gameData: {
        roomCode: selectedGame._id.toString(),
        host: selectedGame.host,
        players: selectedGame.players,
        numOfCompletedRounds: selectedGame.numOfCompletedRounds,
        inProgress: selectedGame.inProgress || false,
      },
    },
    revalidate: 1,
  };
}

Game.propTypes = {};

export default Game;
