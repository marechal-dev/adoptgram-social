import { makeOrganization } from '@Testing/factories/organization-factory';
import { InMemoryOrganizationsRepository } from '@Testing/repositories/in-memory-organizations-repository';
import { expect } from 'vitest';
import { DeleteOrganizationUseCase } from './delete-organization';
import { OrganizationNotFoundException } from './exceptions/organization-not-found-exception';

let inMemoryOrganizationsRepository: InMemoryOrganizationsRepository;
let systemUnderTest: DeleteOrganizationUseCase;

describe('Delete Organization Test Suite', () => {
  beforeEach(() => {
    inMemoryOrganizationsRepository = new InMemoryOrganizationsRepository();
    systemUnderTest = new DeleteOrganizationUseCase(
      inMemoryOrganizationsRepository,
    );
  });

  it("should be able to delete an existent Organization by it's ID", async () => {
    const organization = makeOrganization();

    await inMemoryOrganizationsRepository.create(organization);

    const result = await systemUnderTest.execute({
      organizationID: organization.id.toString(),
    });

    expect(result.isRight()).toBe(true);
    if (result.isRight()) {
      expect(result.value).toBeNull();
    }
  });

  it('should not be able to delete an inexistent Organization', async () => {
    const result = await systemUnderTest.execute({
      organizationID: 'fake-id',
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(OrganizationNotFoundException);
  });
});
