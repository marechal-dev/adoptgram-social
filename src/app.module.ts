import { Module } from '@nestjs/common';
// import { BullModule } from '@nestjs/bull';

// import env from '@Configs/env';

import { InfraModule } from '@Infra/infra.module';

@Module({
  imports: [
    // BullModule.forRoot({
    //   redis: {
    //     host: env.REDIS_HOST,
    //     port: env.REDIS_PORT,
    //   },
    // }),
    InfraModule,
  ],
})
export class AppModule {}
