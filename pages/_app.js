import '../styles/globals.css';
import Layout from '../components/Layout'; //공통 _app.js에 Layout 씌우기

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

export default MyApp;