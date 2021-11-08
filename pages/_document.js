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
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" />
          <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" ></script>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" ></script>
          <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" ></script>

          {/* Font Awesome 5 Intro */}
          <script src="https://kit.fontawesome.com/a076d05399.js"></script>
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