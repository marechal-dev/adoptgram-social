import { AppModule } from '@Infra/app.module';
import { PrismaService } from '@Infra/database/prisma/prisma.service';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { Test } from '@nestjs/testing';
import { hash } from 'bcrypt';
import request from 'supertest';

describe('Authenticate Administrator Controller E2E Test Suite', () => {
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

  test('[POST] /api/sessions/administrators', async () => {
    const email = 'johndoe@example.com';
    const password = '123456789';
    const passwordHash = await hash(password, 8);

    await prisma.administrator.create({
      data: {
        username: 'john-doe',
        email,
        password: passwordHash,
        name: 'John Doe',
      },
    });

    const response = await request(app.getHttpServer())
      .post('/sessions/administrators')
      .send({
        email,
        password,
      });

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        accessToken: expect.any(String),
        userID: expect.any(String),
      }),
    );
  });
});
