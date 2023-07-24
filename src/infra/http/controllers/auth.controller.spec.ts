import {
  NestFastifyApplication,
  FastifyAdapter,
} from '@nestjs/platform-fastify';
import { Test } from '@nestjs/testing';

import request from 'supertest';
import { fakerPT_BR as faker } from '@faker-js/faker';

import { InfraModule } from '@Infra/infra.module';

describe('Common Users Controller', () => {
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

  it(`should /POST sessions and return 200 for a Common User`, async () => {
    const email = faker.internet.email();
    const password = faker.internet.password({
      length: 9,
    });

    await request(app.getHttpServer()).post('/common-users').send({
      username: faker.internet.userName(),
      email,
      password,
      firstName: faker.person.firstName(),
      surname: faker.person.lastName(),
      cpf: '123.123.123-12',
    });

    const response = await request(app.getHttpServer())
      .post('/auth/sessions')
      .send({
        email,
        password,
        kind: 'CommonUser',
      });

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        token: expect.any(String),
      }),
    );
  });

  it(`should /POST sessions and return 200 for an Organization`, async () => {
    const email = faker.internet.email();
    const password = faker.internet.password({
      length: 9,
    });

    await request(app.getHttpServer())
      .post('/organizations')
      .send({
        username: faker.internet.userName(),
        email,
        password,
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

    const response = await request(app.getHttpServer())
      .post('/auth/sessions')
      .send({
        email,
        password,
        kind: 'Organization',
      });

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        token: expect.any(String),
      }),
    );
  });

  it.skip(`should /POST common-users and return 400 on body validation failed`, async () => {
    const response = await request(app.getHttpServer())
      .post('/common-users')
      .send({
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password({
          length: 6,
        }),
        firstName: faker.person.firstName(),
        surname: faker.person.lastName(),
        cpf: '23.12.12213233-12',
      });

    expect(response.statusCode).toEqual(400);
    expect(response.body).toEqual(
      expect.objectContaining({
        errors: expect.any(Object),
      }),
    );
  });

  afterAll(async () => {
    await app.close();
  });
});
