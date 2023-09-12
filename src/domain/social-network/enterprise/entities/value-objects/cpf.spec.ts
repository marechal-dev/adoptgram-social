import { InvalidCpfException } from '../exceptions/invalid-cpf';
import { Cpf } from './cpf';

describe('CPF Value-Object Test Suite', () => {
  it('should be able to create a CPF with valid format', () => {
    const result = Cpf.createFromText('000.000.000-00');

    expect(result.isRight()).toBe(true);
    expect(result.value).toBeInstanceOf(Cpf);
  });

  it('should not be able to create a CPF with invalid length', () => {
    const result = Cpf.createFromText('000.00');

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(InvalidCpfException);
  });

  it('should not be able to create a CPF with invalid format', () => {
    const result = Cpf.createFromText('000_____021341200.000-00');

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(InvalidCpfException);
  });
});
