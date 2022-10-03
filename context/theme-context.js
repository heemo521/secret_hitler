import React, { createContext } from 'react';

export const Themes = {
  light: {
    foreground: '#000000',
    background: '#eeeeee',
  },
  dark: {
    foreground: '#ffffff',
    background: '#222222',
  },
};

export const ThemeContext = createContext({
  theme: Themes.dark,
  toggleTheme: () => {},
});
