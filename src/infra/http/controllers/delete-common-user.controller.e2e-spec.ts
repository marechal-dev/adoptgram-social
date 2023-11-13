import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { Test } from '@nestjs/testing';

import request from 'supertest';

import { AppModule } from '@Infra/app.module';
import { DatabaseModule } from '@Infra/database/database.module';
import { PrismaService } from '@Infra/database/prisma/prisma.service';
import { CommonUserFactory } from '@Testing/factories/common-user-factory';
import { JwtService } from '@nestjs/jwt';
import { hash } from 'bcrypt';
import { expect } from 'vitest';

describe('Delete CommonUser Controller E2E Test Suite', () => {
  let app: NestFastifyApplication;
  let prisma: PrismaService;
  let commonUserFactory: CommonUserFactory;
  let jwt: JwtService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [CommonUserFactory],
    }).compile();

    app = moduleRef.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter(),
    );
    prisma = moduleRef.get(PrismaService);
    commonUserFactory = moduleRef.get(CommonUserFactory);
    jwt = moduleRef.get(JwtService);

    await app.init();
    await app.getHttpAdapter().getInstance().ready();
  });

  afterAll(async () => {
    await app.close();
  });

  test('[DELETE] /api/common-users/:id', async () => {
    const passwordRaw = 'Test1234!';
    const commonUser = await commonUserFactory.make({
      name: 'John Doe',
      username: 'johndoe',
      email: 'johndoe@example.com',
      password: await hash(passwordRaw, 10),
    });

    const accessToken = await jwt.signAsync({
      sub: commonUser.id.toString(),
      username: 'johndoe',
      email: 'johndoe@example.com',
      kind: 'CommonUser',
    });

    const response = await request(app.getHttpServer())
      .delete(`/common-users/${commonUser.id.toString()}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send();

    expect(response.statusCode).toEqual(204);
  });
});
