import {
  NestFastifyApplication,
  FastifyAdapter,
} from '@nestjs/platform-fastify';
import { Test } from '@nestjs/testing';

import request from 'supertest';
import { fakerPT_BR as faker } from '@faker-js/faker';

import { InfraModule } from '@Infra/infra.module';

describe('Organizations Controller', () => {
  let app: NestFastifyApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [InfraModule],
    }).compile();

    app = moduleRef.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter(),
    );

    await app.init();
    await app.getHttpAdapter().getInstance().ready();
  });

  it(`should /POST organizations and return 201`, async () => {
    const response = await request(app.getHttpServer())
      .post('/organizations')
      .send({
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password({
          length: 9,
        }),
        title: faker.company.name(),
        representativeName: faker.person.fullName(),
        whatsapp: faker.phone.number('(##) 9####-####'),
        address: {
          firstLine: faker.location.streetAddress(),
          number: faker.location.buildingNumber(),
          cep: faker.location.zipCode('#####-###'),
          neighborhood: faker.location.county(),
          city: faker.location.city(),
          state: faker.location.state(),
        },
      });

    expect(response.statusCode).toEqual(201);
  });

  it(`should /POST organizations and return 400 on body validation failed`, async () => {
    const response = await request(app.getHttpServer())
      .post('/organizations')
      .send({
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password({
          length: 7,
        }),
        title: faker.company.name(),
        representativeName: faker.person.fullName(),
        whatsapp: faker.phone.number('(##) 22319####-####'),
        address: {
          firstLine: faker.location.streetAddress(),
          number: faker.location.buildingNumber(),
          cep: faker.location.zipCode('######-######'),
          neighborhood: faker.location.county(),
          city: faker.location.city(),
          state: faker.location.state(),
        },
      });

    expect(response.statusCode).toEqual(400);
  });

  afterAll(async () => {
    await app.close();
  });
});
