import dotenv from 'dotenv';

dotenv.config();

const PORT: number = +process.env.PORT! || 3000;
const CORS_PORT: number = +process.env.CORS_PORT!;

const config = {
  PORT: PORT,
  CORS_PORT: CORS_PORT,
};

export default config;