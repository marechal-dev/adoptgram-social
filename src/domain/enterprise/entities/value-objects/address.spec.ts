import { fakerPT_BR as faker } from '@faker-js/faker';

import { Address } from './address';

describe('Address Value-Object Test Suite', () => {
  it('should be possible to create an Address with valid CEP', () => {
    const address = Address.create({
      firstLine: faker.location.street(),
      number: faker.location.buildingNumber(),
      neighborhood: faker.location.county(),
      city: faker.location.city(),
      state: faker.location.state(),
      cep: faker.location.zipCode('#####-###'),
    });

    expect(address).toBeTruthy();
  });

  it('should not be possible to create an Address with invalid CEP length', () => {
    expect(() =>
      Address.create({
        firstLine: faker.location.street(),
        number: faker.location.buildingNumber(),
        neighborhood: faker.location.county(),
        city: faker.location.city(),
        state: faker.location.state(),
        cep: faker.location.zipCode('#####'),
      }),
    ).toThrow();
  });

  it('should not be possible to create an Address with invalid CEP format', () => {
    expect(() =>
      Address.create({
        firstLine: faker.location.street(),
        number: faker.location.buildingNumber(),
        neighborhood: faker.location.county(),
        city: faker.location.city(),
        state: faker.location.state(),
        cep: faker.location.zipCode('##-###'),
      }),
    ).toThrow();
  });
});
