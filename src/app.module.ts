import { Module } from '@nestjs/common';
// import { BullModule } from '@nestjs/bull';

// import env from '@Configs/env';

import { InfraModule } from '@Infra/infra.module';
import { JwtModule } from '@nestjs/jwt';
import env from '@Configs/env';

@Module({
  imports: [
    // BullModule.forRoot({
    //   redis: {
    //     host: env.REDIS_HOST,
    //     port: env.REDIS_PORT,
    //   },
    // }),
    JwtModule.register({
      global: true,
      secret: env.JWT_SECRET,
    }),
    InfraModule,
  ],
})
export class AppModule {}
