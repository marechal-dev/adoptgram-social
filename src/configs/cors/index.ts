import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

import env from '@Configs/env';

export const corsOptions: CorsOptions =
  env.NODE_ENV === 'development'
    ? {
        origin: '*',
        optionsSuccessStatus: 200,
      }
    : {
        optionsSuccessStatus: 200,
      };
