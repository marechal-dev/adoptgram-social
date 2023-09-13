import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { RawServerDefault } from 'fastify';
import { hash } from 'bcrypt';

import { AppModule } from '@Infra/app.module';
import { PrismaService } from '@Infra/database/prisma/prisma.service';

describe('Authenticate Common User Controller E2E Test Suite', () => {
  let app: INestApplication;
  let httpServer: RawServerDefault;
  let prisma: PrismaService;

  beforeAll(async () => {
    console.log(Test);

    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    console.log(moduleRef);

    app = moduleRef.createNestApplication();
    prisma = moduleRef.get(PrismaService);

    await app.init();

    httpServer = app.getHttpServer();
  });

  afterAll(async () => {
    await app.close();
  });

  test('[POST] /api/sessions/common-users', async () => {
    const email = 'johndoe@example.com';
    const password = '1234567';
    const passwordHash = await hash(password, 8);

    await prisma.commonUser.create({
      data: {
        username: 'john-doe',
        email,
        password: passwordHash,
        name: 'John Doe',
        cpf: '000.000.000-00',
      },
    });

    const response = await request(httpServer)
      .post('/api/sessions/common-users')
      .send({
        email,
        password,
      });

    expect(response.statusCode).toEqual(200);
    expect(response.body).toBe(
      expect.objectContaining({
        accessToken: expect.any(String),
      }),
    );
  });
});
