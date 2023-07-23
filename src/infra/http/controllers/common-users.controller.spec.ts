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
    })
      // .overrideProvider(CatsService)
      // .useValue(catsService)
      .compile();

    app = moduleRef.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter(),
    );

    await app.init();
    await app.getHttpAdapter().getInstance().ready();
  });

  it(`should /POST common-users and return 201`, async () => {
    const response = await request(app.getHttpServer())
      .post('/common-users')
      .send({
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password({
          length: 9,
        }),
        firstName: faker.person.firstName(),
        surname: faker.person.lastName(),
        cpf: '123.123.123-12',
      });

    expect(response.statusCode).toEqual(201);
  });

  it(`should /POST common-users and return 400 on body validation failed`, async () => {
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
