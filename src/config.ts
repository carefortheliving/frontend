const config = process.env as unknown as {
  AST_REFRESH: boolean;
  NODE_ENV: 'development' | 'production';
  PUBLIC_URL: string;
  REACT_APP_FIREBASE_APIKEY: string;
  REACT_APP_FIREBASE_APPID: string;
  REACT_APP_FIREBASE_AUTHDOMAIN: string;
  REACT_APP_FIREBASE_DATABASEURL: string;
  REACT_APP_FIREBASE_MEASUREMENTID: string;
  REACT_APP_FIREBASE_MESSAGINGSENDERID: string;
  REACT_APP_FIREBASE_PROJECTID: string;
  REACT_APP_FIREBASE_STORAGEBUCKET: string;
  WDS_SOCKET_HOST: undefined
  WDS_SOCKET_PATH: undefined
  WDS_SOCKET_PORT: undefined
  REACT_APP_PUBLIC_KEY : string;
  REACT_APP_PRIVATE_KEY : string;
};

export default config;
