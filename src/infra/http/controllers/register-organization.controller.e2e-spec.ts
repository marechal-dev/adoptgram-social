import { AppModule } from '@Infra/app.module';
import { PrismaService } from '@Infra/database/prisma/prisma.service';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { Test } from '@nestjs/testing';
import request from 'supertest';

describe('Create Organization Controller E2E Test Suite', () => {
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

  test('[POST] /api/organizations', async () => {
    const response = await request(app.getHttpServer())
      .post('/organizations')
      .send({
        username: 'lambeijos-luz',
        email: 'lambeijos-luz@gmail.com',
        password: 'Teste123!',
        title: 'ONG Lambeijos de Luz',
        representativeName: 'John Doe',
        cnpj: '00.000.000/0001-00',
        whatsapp: '(53) 98888-7777',
        city: 'Rio Grande',
        state: 'Rio Grande do Sul',
      });

    expect(response.statusCode).toEqual(201);
  });
});
