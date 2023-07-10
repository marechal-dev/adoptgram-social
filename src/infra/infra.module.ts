import { Module } from '@nestjs/common';

import { PersistenceModule } from './persistence/persistence.module';
import { HttpModule } from './http/http.module';
import { ServicesModule } from './services/services.module';

@Module({
  imports: [PersistenceModule, ServicesModule, HttpModule],
})
export class InfraModule {}
