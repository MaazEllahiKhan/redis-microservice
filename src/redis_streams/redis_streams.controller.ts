import { Controller, Get, Param } from '@nestjs/common';
import { RedisStreamsService } from './redis_streams.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { interval, map } from 'rxjs';

@Controller('redis-streams')
export class RedisStreamsController {
    constructor(private readonly redisStreamService: RedisStreamsService) { }

    @MessagePattern({ cmd: 'redis-ping' })
    redisPing() {
        return this.redisStreamService.redisPing();
    }

    @MessagePattern({ cmd: 'test-pattern' })
    getTestPattern() {
        return interval(1000).pipe(
            map((value) => value + 1) // Starts from 1 and increments every second
        );
    }

    @MessagePattern({ cmd: 'message' })
    getMessage() {
        return this.redisStreamService.getSingleNewMessage();
    }

    @MessagePattern({ cmd: 'messages' })
    getMessages() {
        return this.redisStreamService.getMultipleNewMessages(3);
    }

    @MessagePattern({ cmd: 'consume' })
    consume(@Payload() data: { group: string, consumer: string, count: number }) {
        const { group, consumer, count } = data;
        return this.redisStreamService.consumeMessageFromGroup(group, consumer, count);
    }
}
