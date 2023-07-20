import fastify from 'fastify';

type JwtPayload = {
  sub: string;
  username: string;
  email: string;
  kind: 'Admin' | 'CommonUser' | 'Organization';
};

declare module 'fastify' {
  export interface FastifyRequest {
    user?: JwtPayload;
  }
}
