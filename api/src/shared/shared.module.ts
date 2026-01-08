import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { LoggerModule } from './logger/logger.module';
import databaseConfig from './config/database.config';
import envConfig from './config/env.config';
import loggerConfig from './config/logger.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, envConfig, loggerConfig],
    }),
    DatabaseModule,
    LoggerModule,
  ],
  exports: [DatabaseModule, LoggerModule],
})
export class SharedModule {}
