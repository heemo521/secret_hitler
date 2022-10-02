import React, { useState } from 'react';
import Image from 'next/Image';
import FascistBoard from '../../public/Secret Hit/board-fa.png';
import LiberalBoard from '../../public/Secret Hit/board-li.png';

import PropTypes from 'prop-types';

function GameBoard({ gameData }) {
  const { players, numOfCompletedRounds } = gameData;

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
