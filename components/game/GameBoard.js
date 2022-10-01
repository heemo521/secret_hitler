import React, { useState } from 'react';
import Image from 'next/Image';
import FascistBoard from '../../public/Secret Hit/board-fa.png';
import LiberalBoard from '../../public/Secret Hit/board-li.png';
import HowToPlay from '../home/HowToPlay';
import PropTypes from 'prop-types';

function GameBoard({ gameData }) {
  const { players, numOfCompletedRounds } = gameData;
  console.log(gameData);
  // const [toggleModal, setToggleModal] = useState(false);
  // if (toggleModal) {
  //   // TODO: open it as a modal
  //   return <HowToPlay />;
  // }
  return (
    <div>
      <h1>Round {numOfCompletedRounds + 1}</h1>
      <Image src={FascistBoard} alt="FascistBoard" width={500} height={800} />
      <Image src={LiberalBoard} alt="LiberalBoard" width={500} height={800} />
    </div>
  );
}

GameBoard.propTypes = {};

export default GameBoard;
