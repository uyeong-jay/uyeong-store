// Next.js 페이지가 마크업을 건너뛰기 때문에
// custom Document로 애플리케이션 <html>및 <body>태그 를 보강하는 데 사용. 

import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document{
  render() {
    return(
      <Html leng="en">
        <Head>
          <meta name="desciption" content="Sell-photos website with Next.js" />

          {/* 부트스트랩 ver 4 - CSS, JS*/}
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css" />
          <script src="https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossOrigin="anonymous"></script>
          <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/js/bootstrap.bundle.min.js"></script>

          {/* Font Awesome 5 Intro */}
          <script src="https://kit.fontawesome.com/a076d05399.js"></script>

          {/* Paypal checkout - https://developer.paypal.com/docs/checkout/integrate/ */}
          <script src={`https://www.paypal.com/sdk/js?client-id=${process.env.PAYPAL_CLIENT_ID}`}></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;