import { InvalidCnpjException } from '../exceptions/invalid-cnpj';

import { Cnpj } from './cnpj';

describe('CNPJ Value-Object Test Suite', () => {
  it('should be able to create a CNPJ with valid format', () => {
    const cnpj = Cnpj.createFromText('99.999.999/9999-99');

    expect(cnpj.isLeft()).toBe(false);
    expect(cnpj.value).toBeInstanceOf(Cnpj);
  });

  it('should not be able to create a CNPJ with invalid length', () => {
    const invalidCnpj = Cnpj.createFromText('99');

    expect(invalidCnpj.isLeft()).toBe(true);
    expect(invalidCnpj.value).toBeInstanceOf(InvalidCnpjException);
  });

  it('should not be able to create a CNPJ with invalid format', () => {
    const invalidCnpj = Cnpj.createFromText('99');

    expect(invalidCnpj.isLeft()).toBe(true);
    expect(invalidCnpj.value).toBeInstanceOf(InvalidCnpjException);
  });
});
