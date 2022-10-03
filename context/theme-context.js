import React, { createContext, useContext, useState } from 'react';

//styles here
export const Themes = {
  light: {
    color: '#000000',
    background: '#eeeeee',
  },
  dark: {
    color: '#ffffff',
    background: '#222222',
  },
};

export const ThemeContext = createContext({
  theme: Themes.dark,
  toggleTheme: () => {},
});

// custom hook for theme & toggleTheme
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
