import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { HttpModule } from './http/http.module';

@Module({
  imports: [AuthModule, HttpModule],
})
export class AppModule {}
