import { FastifyCookieOptions } from "@fastify/cookie";

import env from "@Configs/env";

export const cookieConfigs: FastifyCookieOptions = {
  secret: env.COOKIE_SECRET,
};
