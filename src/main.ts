import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.REDIS,
    options: {
      host: 'localhost',
      port: 10001,
    },
  });
  // app.connectMicroservice<MicroserviceOptions>();
  // app.startAllMicroservices()
  await app.listen().then((e) => console.log('redis MS started', e));
}
bootstrap();
