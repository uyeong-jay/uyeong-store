module.exports = {
  reactStrictMode: true,
  env: {
    BASE_URL: process.env.BASE_URL,
    MONGODB_URL: process.env.MONGODB_URL,

    //https://passwordsgenerator.net/
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,

    //paypal - client id
    PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID,

    //cloudinary
    CLOUD_UPDATE_PRESET: process.env.CLOUD_UPDATE_PRESET,
    CLOUD_NAME: process.env.CLOUD_NAME,
    CLOUD_API: process.env.CLOUD_API, //image upload base url
  },
};
//config 파일을 수정한뒤에는 항상 다시 시작해주기
