import React from 'react';
import Link from 'next/link';
import HowToPlay from '../components/home/HowToPlay';

import PropTypes from 'prop-types';

function Home(props) {
  return (
    <div styles={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      <h1>SECRET HITLER</h1>
      <HowToPlay />
      <Link href="/lobby" styles={{ color: 'red' }}>
        PLAY
      </Link>
    </div>
  );
}

Home.propTypes = {};

export default Home;
