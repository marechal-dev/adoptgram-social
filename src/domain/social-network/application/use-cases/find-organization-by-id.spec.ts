import { OrganizationFactory } from '@Testing/factories/organization-factory';
import { InMemoryOrganizationsRepository } from '@Testing/repositories/in-memory-organizations-repository';
import { FindOrganizationByIdUseCase } from './find-organization-by-id';

let inMemoryOrganizationsRepository: InMemoryOrganizationsRepository;
let systemUnderTest: FindOrganizationByIdUseCase;

describe('Find Organization By ID Test Suite', () => {
  beforeEach(() => {
    inMemoryOrganizationsRepository = new InMemoryOrganizationsRepository();
    systemUnderTest = new FindOrganizationByIdUseCase(
      inMemoryOrganizationsRepository,
    );
  });

  it("should be able to fetch an existent organization by it's ID", async () => {
    const organization = OrganizationFactory.make({
      title: 'Lambeijos de Luz',
    });

    await inMemoryOrganizationsRepository.create(organization);

    const result = await systemUnderTest.execute({
      organizationID: organization.id.toString(),
    });

    expect(result.isRight()).toBe(true);
    if (result.isRight()) {
      expect(result.value.organization.title).toEqual('Lambeijos de Luz');
    }
  });
});
