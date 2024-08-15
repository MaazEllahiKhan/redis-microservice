import { Inject, Module, OnModuleDestroy } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { CACHE_MANAGER, CacheModule } from '@nestjs/cache-manager';
// import * as redisStore  from 'cache-manager-redis-store';
import { RedisClientOptions } from 'redis';
import { Cache } from 'cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
import { RedisModule } from './redis/redis.module';
import { RedisStreamsModule } from './redis_streams/redis_streams.module';

@Module({
  imports: [
    CacheModule.register<RedisClientOptions>({
      isGlobal: true,
      ttl: 60 * 1000,
      store: async () =>
        await redisStore({
          socket: {
            host: 'localhost',
            port: 10001,
          },
        }),
    }),
    RedisModule,
    ProductsModule,
    RedisStreamsModule],
  controllers: [],
  providers: [],
})
export class AppModule implements OnModuleDestroy {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) { }

  async onModuleDestroy() {
    // @ts-expect-error as store.client is not currently exposed
    await this.cacheManager.store.client.quit()
  }
}

