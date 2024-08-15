import { Module } from '@nestjs/common';
import { RedisStreamsController } from './redis_streams.controller';
import { RedisStreamsService } from './redis_streams.service';
import { RedisModule } from 'src/redis/redis.module';

@Module({
  imports:[RedisModule],
  controllers: [RedisStreamsController],
  providers: [RedisStreamsService]
})
export class RedisStreamsModule {}
