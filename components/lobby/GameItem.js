import React from 'react';
import Link from 'next/link';
import Image from 'next/Image';
// import { Link, Image } from 'next';
import PropTypes from 'prop-types';

function GameItem({ id, gameType, image, title, description }) {
  return (
    <li>
      <Link href={'/' + id}>{title}</Link>
      <div>
        <Image src={image} alt={title} width={500} height={500} />
        <p>{description}</p>
      </div>
    </li>
  );
}

GameItem.propTypes = {
  id: PropTypes.number.isRequired,
  gameType: PropTypes.string.isRequired,
  image: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default GameItem;
