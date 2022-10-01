import React, { useState } from 'react';
import { MongoClient, ObjectId } from 'mongodb';
import router from 'next/router';
import WaitingRoom from '../../../components/rooms/WaitingRoom';
import GameBoard from '../../../components/game/GameBoard';
import PropTypes from 'prop-types';

function Game({ gameData, isValidGame }) {
  const [startGame, setStartGame] = useState(false);

  //Room does not exist should redirect the user to the lobby room
  if (!isValidGame) {
    return <h1>this room does not exist fool!!!</h1>;
  }

  const startGameHandler = () => {
    setStartGame(true);
  };
  // Players are in the game lobby until the game is started and there is at least 5 players
  // The game will automatically be started if there are 10 players (maximum players allowed)

  if (!startGame) {
    return <WaitingRoom onStartGame={startGameHandler} gameData={gameData} />;
  }

  return (
    <div>
      <h1>Game Board</h1>
      <GameBoard gameData={gameData} />
    </div>
  );
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

  console.log(selectedGame);

  // Make some query to the server to see if the room exists or if the game is already started etc.
  // should I allow spectator mode? Hmm...
  // verifyRoomCode(roomCode);
  // selectedGame.map((game) => ({
  //         id: game._id.toString(),
  //         player: [],
  //       })),

  return {
    props: {
      isValidGame: selectedGame !== undefined,
      gameData: {
        roomCode: selectedGame._id.toString(),
        host: selectedGame.host,
        players: selectedGame.players,
      },
    },
    revalidate: 1,
  };
}

Game.propTypes = {};

export default Game;
