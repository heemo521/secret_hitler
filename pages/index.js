import React from 'react';
import Link from 'next/link';

import PropTypes from 'prop-types';

function Home(props) {
  return (
    <div styles={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      <h1>Home</h1>
      <Link href="/lobby">Enter Lobby</Link>
    </div>
  );
}

Home.propTypes = {};

export default Home;
