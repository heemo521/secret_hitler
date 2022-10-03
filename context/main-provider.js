import React from 'react';
import ThemeProvider from './theme-context';
import UserProvider from './user-context';
import PropTypes from 'prop-types';

function MainProvider({ children }) {
  return (
    <>
      <ThemeProvider>
        <UserProvider>{children}</UserProvider>
      </ThemeProvider>
    </>
  );
}

MainProvider.propTypes = {};

export default MainProvider;
