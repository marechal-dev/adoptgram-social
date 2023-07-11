import { Cnpj } from './cnpj';

describe('CNPJ Value-Object Test Suite', () => {
  it('should be able to create a CNPJ with valid format', () => {
    const cnpj = Cnpj.createFromText('99.999.999/9999-99');

    expect(cnpj).toBeTruthy();
    expect(cnpj.toValue()).toEqual('99.999.999/9999-99');
  });

  it('should not be able to create a CNPJ with invalid length', () => {
    expect(() => Cnpj.createFromText('99')).toThrow();
  });

  it('should not be able to create a CNPJ with invalid format', () => {
    expect(() => Cnpj.createFromText('99__999.999-9999/99')).toThrow();
  });
});
