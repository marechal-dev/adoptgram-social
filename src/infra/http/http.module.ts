import { DatabaseModule } from '@Infra/database/database.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [DatabaseModule],
})
export class HttpModule {}
