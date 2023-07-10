import { Injectable } from '@nestjs/common';

import env from '@Configs/env';

@Injectable()
export class MailService {
  public async dispatchSendAccountCreationSuccessfulEmailJob() {
    // ...
  }

  public async dispatchSendResetPasswordEmailJob() {
    // ...
  }
}
