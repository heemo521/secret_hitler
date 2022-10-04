import React from 'react';
import PropTypes from 'prop-types';

function layout({ children }) {
  return (
    <>
      <header>header</header>
      <main>{children}</main>
      <footer>footer</footer>
    </>
  );
}

layout.propTypes = {};

export default layout;
