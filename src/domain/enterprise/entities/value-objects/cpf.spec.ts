import { Cpf } from './cpf';

describe('CPF Value-Object Test Suite', () => {
  it('should be able to create a CPF with valid format', () => {
    const cpf = Cpf.createFromText('000.000.000-00');

    expect(cpf).toBeTruthy();
    expect(cpf.value).toEqual('000.000.000-00');
  });

  it('should not be able to create a CPF with invalid length', () => {
    expect(() => Cpf.createFromText('000')).toThrow();
  });

  it('should not be able to create a CPF with invalid format', () => {
    expect(() => Cpf.createFromText('000-2csadf-214fd.dqwsd')).toThrow();
  });
});
