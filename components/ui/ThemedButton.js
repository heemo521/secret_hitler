import React from 'react';
import { useTheme } from '../../context/theme-context';
import PropTypes from 'prop-types';

function ThemedButton({ onClick, children, style }) {
  const { theme } = useTheme();

  return (
    <button style={{ ...theme, ...style }} onClick={onClick}>
      {children}
    </button>
  );
}

ThemedButton.propTypes = {};

export default ThemedButton;
