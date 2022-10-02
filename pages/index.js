import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import HowToPlay from '../components/home/HowToPlay';
import PropTypes from 'prop-types';

function Home(props) {
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
        <HowToPlay />
        <Link href="/lobby" styles={{ color: 'red' }}>
          PLAY
        </Link>
      </div>
    </>
  );
}

Home.propTypes = {};

export default Home;
