import { Module } from '@nestjs/common';

import { PersistenceModule } from './persistence/persistence.module';
import { HttpModule } from './http/http.module';

@Module({
  imports: [PersistenceModule, HttpModule],
})
export class InfraModule {}
