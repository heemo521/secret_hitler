import React, { createContext, useState } from 'react';

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

export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(Themes.dark);

  function toggleTheme() {
    setTheme((themes) => (themes === Themes.dark ? Themes.light : Themes.dark));
  }

  const value = { theme, toggleTheme };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
