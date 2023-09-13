import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';

import request from 'supertest';
import { hash } from 'bcrypt';

import { AppModule } from '@Infra/app.module';
import { PrismaService } from '@Infra/database/prisma/prisma.service';

describe('Authenticate Organization Controller E2E Test Suite', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    prisma = moduleRef.get(PrismaService);

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  test('[POST] /api/sessions/organizations', async () => {
    const email = 'johndoe@example.com';
    const password = '1234567';
    const passwordHash = await hash(password, 8);

    await prisma.organization.create({
      data: {
        username: 'example_organization',
        email,
        password: passwordHash,
        title: 'Example Organization',
        representativeName: 'John Doe',
        whatsapp: '(53) 98888-1234',
        cnpj: '99.999.999/0001-99',
      },
    });

    const response = await request(app.getHttpServer())
      .post('/api/sessions/organizations')
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
