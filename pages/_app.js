import '../styles/globals.css';
import Layout from '../components/Layout'; //공통 _app.js에 Layout 씌우기
import { DataProvider } from '../store/globalState';

function MyApp({ Component, pageProps }) {
  return (
    <DataProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </DataProvider>
  );
};

export default MyApp;