import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { registerAs } from '@nestjs/config';

export default registerAs('database', (): TypeOrmModuleOptions => {
  const dbUrl = process.env.DATABASE_URL?.trim();

  return {
    type: 'postgres',
    url: dbUrl,
    autoLoadEntities: true,
    synchronize: false,
  };
});
