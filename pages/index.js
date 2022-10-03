import React, { useContext } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Overview from '../components/home/Overview';
import { ThemeContext } from '../context/theme-context';

import PropTypes from 'prop-types';

function Home(props) {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <>
      <Head>
        <title>Secret Hitler | PLAY ONLINE </title>
        <meta
          name="description"
          content="A simple, lightweight, and flexible JavaScript library for building websites"
        />
      </Head>
      <div
        styles={{ width: '100%', display: 'flex', justifyContent: 'center' }}
      >
        <h1>SECRET HITLER</h1>
        <p>
          The year is 1932. The place is pre-WWII Germany. In Secret Hitler,
          players are German politicians attempting to hold a fragile Liberal
          government together and stem the rising tide of Fascism. Watch out
          though—there are secret Fascists among you, and one player is Secret
          Hitler.
        </p>
        <Overview />
        <button
          style={{ backgroundColor: theme.background }}
          onClick={toggleTheme}
        >
          Theme Change
        </button>
        <Link href="/lobby" styles={{ color: 'red' }}>
          <button> PLAY</button>
        </Link>
      </div>
    </>
  );
}

Home.propTypes = {};

export default Home;
