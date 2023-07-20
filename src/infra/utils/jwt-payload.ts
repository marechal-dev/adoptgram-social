export type JwtPayload = {
  sub: string;
  username: string;
  email: string;
  kind: 'Admin' | 'CommonUser' | 'Organization';
};
