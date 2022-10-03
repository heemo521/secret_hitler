import React, { createContext, useContext, useState } from 'react';

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

export function useTheme() {
  return useContext(ThemeContext);
}
export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(Themes.dark);

  const toggleTheme = () => {
    setTheme((themes) => (themes === Themes.dark ? Themes.light : Themes.dark));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
