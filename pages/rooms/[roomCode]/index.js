import React, { useEffect, useState } from 'react';
import axios from 'axios';
import dbConnect from '../../../utils/dbConnect';
import Game from '../../../models/game';
import WaitingRoom from '../../../components/rooms/WaitingRoom';
import GameBoard from '../../../components/game/GameBoard';
import PropTypes from 'prop-types';

//TODO: Implement chat here so that player scan see start chatting as soon as they enter the waiting room
function GameRoom({ gameData }) {
  const [startGame, setStartGame] = useState(false);

  useEffect(() => {
    setStartGame(gameData.inProgress);
  }, [gameData.inProgress]);

  const startGameHandler = async () => {
    try {
      const uri = `/api/game/${gameData.roomCode}`;
      const res = await axios.patch(uri, { inProgress: true });
      const { success, message } = res.data;

      if (!success) throw new Error(message);

      setStartGame(true);
    } catch (err) {
      console.log(err);
      return;
    }
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
  const { host, players, numOfCompletedRounds, inProgress } = selectedGame;
  const gamePlayers = players.map((player) => ({
    id: player._id.toString(),
    name: player.name,
    role: player.role,
  }));

  return {
    props: {
      gameData: {
        roomCode,
        host,
        players: gamePlayers,
        numOfCompletedRounds,
        inProgress,
      },
    },
    revalidate: 1,
  };
}

GameRoom.propTypes = {};

export default GameRoom;
