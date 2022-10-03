import React from 'react';
import { ThemeContext, theme } from '../../context/ThemeContext';
import PropTypes from 'prop-types';

function Button(props) {
  return <ThemeContext.Provider value={'dark'}></ThemeContext.Provider>;
}

Button.propTypes = {};

export default Button;
