import { makeCommonUser } from '@Testing/factories/common-user-factory';

import { User } from './user';

describe('Common User Entity Test Suite', () => {
  it('should ensure that an Common User instance inherits from the User abstract class', () => {
    const commonUser = makeCommonUser();

    expect(commonUser).toBeInstanceOf(User);
  });
});
