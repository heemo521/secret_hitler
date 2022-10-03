import '../styles/globals.css';
import { useState } from 'react';
import { ThemeContext, Themes } from '../context/theme-context';

function MyApp({ Component, pageProps }) {
  const [theme, setTheme] = useState(Themes.dark);

  function toggleTheme() {
    setTheme((themes) => (themes === Themes.dark ? Themes.light : Themes.dark));
  }

  const value = { theme, toggleTheme };

  return (
    <ThemeContext.Provider value={value}>
      <Component {...pageProps} />
    </ThemeContext.Provider>
  );
}

export default MyApp;
