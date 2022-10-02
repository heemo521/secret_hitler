import React from 'react';
import Link from 'next/link';
import Image from 'next/Image';
import secret1 from '../../public/secret1.jpg';
import PropTypes from 'prop-types';

function GameItem({ games }) {
  // const { id, title, host } = games;
  console.log(games);
  return (
    <li>
      <Link href={'/' + 1234}>
        <p>{'123'}</p>
      </Link>
      <div>
        <Image src={secret1} alt={'123'} width={300} height={300} />
        {/* <p>{host}</p> */}
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
