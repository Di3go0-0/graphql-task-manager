import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  await app.listen(configService.get('env.apiPort') ?? 3000);
  console.log(
    `Server running at http://localhost:${configService.get('env.apiPort') ?? 3000}`,
  );
}
bootstrap().catch(console.error);
