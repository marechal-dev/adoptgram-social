import { Module } from '@nestjs/common';
import { InfraModule } from '@Infra/infra.module';
import { BullModule } from '@nestjs/bull';
import env from '@Configs/env';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: env.REDIS_HOST,
        port: env.REDIS_PORT,
      },
    }),
    InfraModule,
  ],
})
export class AppModule {}
