import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { registerAs } from '@nestjs/config';
import { Task } from '../../modules/task/models/task.model';

export default registerAs('database', (): TypeOrmModuleOptions => {
  const dbUrl = process.env.DATABASE_URL?.trim();

  return {
    type: 'postgres',
    url: dbUrl,
    entities: [Task],
    synchronize: false,
    migrations: ['dist/migrations/*.js'],
    migrationsRun: true,
    logging: process.env.NODE_ENV === 'development',
  };
});
