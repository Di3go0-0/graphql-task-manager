import { registerAs } from '@nestjs/config';

export default registerAs('env', () => ({
  apiPort: Number(process.env.API_PORT),

  db: {
    name: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
    url: process.env.DATABASE_URL,
  },

  secretKey: process.env.SECRET_KEY,
}));
