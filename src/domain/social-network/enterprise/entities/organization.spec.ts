import { makeOrganization } from '@Testing/factories/organization-factory';
import { User } from './user';

describe('Organization Entity Test Suite', () => {
  it('should ensure that an Organization instance inherits from the User abstract class', () => {
    const organization = makeOrganization();

    expect(organization).toBeInstanceOf(User);
  });
});
