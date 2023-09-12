import { User } from './user';
import { CommonUserFactory } from '@Testing/factories/common-user-factory';

describe('Common User Entity Test Suite', () => {
  it('should ensure that an Common User instance inherits from the User abstract class', () => {
    const commonUser = CommonUserFactory.make();

    expect(commonUser).toBeInstanceOf(User);
  });
});
