import React, { useEffect } from 'react';
import Head from 'next/head';
import io from 'socket.io-client';
import { useRouter } from 'next/router';
import Overview from '../components/home/Overview';
import ThemedButton from '../components/ui/ThemedButton';
import { useTheme } from '../context/theme-context';
import axios from 'axios';

import PropTypes from 'prop-types';

let socket;
function Home(props) {
  const router = useRouter();
  const { toggleTheme } = useTheme();
  const buttonStyle = { padding: '1em' };

  useEffect(() => {
    socketInitializer();
  }, []);

  const socketInitializer = async () => {
    await axios('/api/socket');

    socket = io();

    socket.on('newIncomingMessage', (msg) => {
      // setMeesages((curMsg) => [...curMsg, {author: msg.author, message: msg.message}])
    });
  };

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

        <ThemedButton style={buttonStyle} onClick={() => router.push('/lobby')}>
          PLAY
        </ThemedButton>

        <div>
          <ThemedButton style={buttonStyle} onClick={toggleTheme}>
            Change Theme!
          </ThemedButton>
          <ThemedButton
            style={buttonStyle}
            onClick={() => alert('ThemedButton!!!!')}
          >
            Custom ThemedButton
          </ThemedButton>
        </div>
      </div>
    </>
  );
}

Home.propTypes = {};

export default Home;
