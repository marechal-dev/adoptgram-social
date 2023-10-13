import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { Test } from '@nestjs/testing';

import request from 'supertest';

import { AppModule } from '@Infra/app.module';
import { PrismaService } from '@Infra/database/prisma/prisma.service';

describe('Create Commom User Controller E2E Test Suite', () => {
  let app: NestFastifyApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter(),
    );
    prisma = moduleRef.get(PrismaService);

    await app.init();
    await app.getHttpAdapter().getInstance().ready();
  });

  afterAll(async () => {
    await app.close();
  });

  test('[POST] /api/common-users', async () => {
    const response = await request(app.getHttpServer())
      .post('/common-users')
      .send({
        username: 'john-doe',
        email: 'johndoe@example.com',
        password: 'Teste123!',
        name: 'John Doe',
        cpf: '000.000.000-00',
      });

    expect(response.statusCode).toEqual(201);
  });
});
