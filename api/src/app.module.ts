import { Module } from '@nestjs/common';
import { ModulesModule } from './modules/modules.module';
import { SharedModule } from './shared/shared.module';
import { ConfigModule } from '@nestjs/config';
import { databaseConfig, envConfig } from './shared/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [envConfig, databaseConfig],
    }),
    ModulesModule,
    SharedModule,
  ],
})
export class AppModule {}
