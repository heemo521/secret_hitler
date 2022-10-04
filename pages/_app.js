import MainProvider from '../context/main-provider';
import Layout from '../components/layout';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <MainProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </MainProvider>
  );
}

export default MyApp;
