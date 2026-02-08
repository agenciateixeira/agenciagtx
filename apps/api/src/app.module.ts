import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { BullModule } from '@nestjs/bullmq';
import { ScheduleModule } from '@nestjs/schedule';
import { CacheConfigModule } from './core/cache/cache.module';
import { PrismaModule } from './core/database/prisma.module';
import { RequestLoggerMiddleware } from './core/middlewares/request-logger.middleware';
import { AuthModule } from './modules/auth/auth.module';
import { LeadsModule } from './modules/leads/leads.module';
import { UtmModule } from './modules/utm/utm.module';
import { EventsModule } from './modules/events/events.module';
import { PipelineModule } from './modules/pipeline/pipeline.module';
import { WhatsappModule } from './modules/whatsapp/whatsapp.module';
import { AutomationsModule } from './modules/automations/automations.module';
import { AnalyticsModule } from './modules/analytics/analytics.module';

const automationsDisabled = process.env.AUTOMATIONS_DISABLED === 'true';
const bullImports = automationsDisabled
  ? []
  : [
      BullModule.forRootAsync({
        inject: [ConfigService],
        useFactory: (config: ConfigService) => {
          const redisUrl = new URL(config.get<string>('REDIS_URL') ?? 'redis://127.0.0.1:6379');
          return {
            connection: {
              host: redisUrl.hostname,
              port: Number(redisUrl.port || 6379),
              password: redisUrl.password || undefined,
            },
          };
        },
      }),
    ];

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    CacheConfigModule,
    ThrottlerModule.forRoot([{ ttl: 60, limit: 120 }]),
    ScheduleModule.forRoot(),
    ...bullImports,
    AuthModule,
    LeadsModule,
    UtmModule,
    EventsModule,
    PipelineModule,
    WhatsappModule,
    AutomationsModule,
    AnalyticsModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware).forRoutes('*');
  }
}
