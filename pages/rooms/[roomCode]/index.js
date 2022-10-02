import React, { useEffect, useState } from 'react';
import dbConnect from '../../../utils/dbConnect';
import Game from '../../../models/game';

import WaitingRoom from '../../../components/rooms/WaitingRoom';
import GameBoard from '../../../components/game/GameBoard';
import axios from 'axios';
import PropTypes from 'prop-types';

//TODO: Implement chat here so that player scan see start chatting as soon as they enter the waiting room

function GameRoom({ gameData, isValidGame }) {
  const [startGame, setStartGame] = useState(false);

  // useEffect(() => {
  //   console.log(gameData.inProgress);
  //   setStartGame(gameData.inProgress);
  // }, [gameData.inProgress]);

  //Room does not exist should redirect the user to the lobby room
  if (!isValidGame) {
    return <h1>this room does not exist fool!!!</h1>;
  }

  const startGameHandler = async () => {
    const inProgress = true;
    const res = await axios.patch(`/api/game/${roomCode}`, { inProgress });

    if (res.status === 201) setStartGame(true);
  };

  if (!startGame) {
    return <WaitingRoom onStartGame={startGameHandler} gameData={gameData} />;
  }

  //When Game Starts, We'll redirect the users to the game room
  return <GameBoard gameData={gameData} />;
}

export async function getStaticPaths() {
  await dbConnect();
  const games = await Game.find({}, { _id: 1 });
  console.log(games);
  return {
    fallback: false,
    paths: games.map((game) => ({
      params: { roomCode: game._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  await dbConnect();
  const { roomCode } = context.params;

  const selectedGame = await Game.findById(roomCode);
  console.log(selectedGame);
  const { host, players, numOfCompletedRounds, inProgress } = selectedGame;

  return {
    props: {
      isValidGame: selectedGame !== undefined,
      gameData: {
        roomCode,
        host,
        players: players.map((player) => ({
          id: player._id.toString(),
          name: player.name,
          role: null,
        })),
        numOfCompletedRounds,
        inProgress: inProgress,
      },
    },
    revalidate: 1,
  };
}

GameRoom.propTypes = {};

export default GameRoom;
