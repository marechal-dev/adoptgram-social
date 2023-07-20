import {
  NestFastifyApplication,
  FastifyAdapter,
} from '@nestjs/platform-fastify';
import { Test } from '@nestjs/testing';

import { InfraModule } from '@Infra/infra.module';

describe('Organizations Controller', () => {
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

  it(`/GET cats`, async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/cats',
    });

    expect(response.statusCode).toEqual(200);
    expect(response.payload).toEqual({});
  });

  afterAll(async () => {
    await app.close();
  });
});
