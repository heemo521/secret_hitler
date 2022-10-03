import '../styles/globals.css';
import MainProvider from '../context/main-provider';

function MyApp({ Component, pageProps }) {
  return (
    <MainProvider>
      <Component {...pageProps} />
    </MainProvider>
  );
}

export default MyApp;
