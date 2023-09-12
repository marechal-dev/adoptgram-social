/* eslint-disable @typescript-eslint/no-unused-vars */
import fastify from 'fastify';

type UserPayload = {
  sub: string;
  username: string;
  email: string;
  kind: 'Admin' | 'CommonUser' | 'Organization';
};

declare module 'fastify' {
  export interface FastifyRequest {
    user?: UserPayload;
  }
}
