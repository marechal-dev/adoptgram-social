import { FetchTimelinePostsUseCase } from '@Domain/social-network/application/use-cases/fetch-timeline-posts';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { AllowedRoles } from '../decorators/allowed-roles.decorator';
import { RolesGuard } from '../guards/roles.guard';
import { TimelinePostPresenter } from '../presenters/timeline-post-presenter';

@Controller('/posts')
export class FetchTimelinePostsController {
  public constructor(
    private readonly fetchTimelinePosts: FetchTimelinePostsUseCase,
  ) {}

  @Get('/timeline')
  @AllowedRoles('Organization', 'CommonUser')
  @UseGuards(RolesGuard)
  @ApiTags('Post')
  @ApiBearerAuth()
  public async handle() {
    const result = await this.fetchTimelinePosts.execute();

    if (result.isRight()) {
      const resultValue = result.value.timelinePosts;

      return {
        timelinePosts: resultValue.map(TimelinePostPresenter.toHTTP),
      };
    }
  }
}
