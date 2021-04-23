// import dotenv from 'dotenv'

// const config = dotenv.config()

const config = process.env as unknown as {
  AST_REFRESH: boolean;
  NODE_ENV: 'development' | 'production';
  PUBLIC_URL: string;
  REACT_APP_firebase_apiKey: string;
  REACT_APP_firebase_appId: string;
  REACT_APP_firebase_authDomain: string;
  REACT_APP_firebase_databaseURL: string;
  REACT_APP_firebase_measurementId: string;
  REACT_APP_firebase_messagingSenderId: string;
  REACT_APP_firebase_projectId: string;
  REACT_APP_firebase_storageBucket: string;
  WDS_SOCKET_HOST: undefined
  WDS_SOCKET_PATH: undefined
  WDS_SOCKET_PORT: undefined
};

export default config;
