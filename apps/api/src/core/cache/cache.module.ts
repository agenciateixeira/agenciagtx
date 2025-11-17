import { CacheModule } from '@nestjs/cache-manager';
import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { redisStore } from 'cache-manager-ioredis-yet';

@Global()
@Module({
  imports: [
    CacheModule.registerAsync({
      inject: [ConfigService],
      imports: [ConfigModule],
      isGlobal: true,
      useFactory: async (config: ConfigService) => {
        const redisUrl = config.get<string>('REDIS_URL') ?? 'redis://127.0.0.1:6379';

        return {
          store: await redisStore({
            url: redisUrl,
          }),
          ttl: 30,
        };
      },
    }),
  ],
  exports: [CacheModule],
})
export class CacheConfigModule {}
