import { APP_GUARD } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { CacheModule } from '@nestjs/cache-manager';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

import env from '@Configs/env';

import { InfraModule } from '@Infra/infra.module';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: env.REDIS_HOST,
        port: env.REDIS_PORT,
      },
    }),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    CacheModule.register(),
    InfraModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    }
  ],
})
export class AppModule {}
