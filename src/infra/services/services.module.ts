import { Module } from '@nestjs/common';
import { MailService } from './mail/mail.service';

@Module({
  exports: [MailService],
})
export class ServicesModule {}
