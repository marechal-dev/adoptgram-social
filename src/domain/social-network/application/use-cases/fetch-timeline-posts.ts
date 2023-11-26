import { Either, right } from '@Core/types/either';
import { TimelinePost } from '@Domain/social-network/enterprise/entities/value-objects/timeline-post';
import { Injectable } from '@nestjs/common';

import { PostsRepository } from '../repositories/posts-repository';

type FetchTimelinePostsResponse = Either<
  null,
  {
    timelinePosts: TimelinePost[];
  }
>;

@Injectable()
export class FetchTimelinePostsUseCase {
  public constructor(private readonly postsRepository: PostsRepository) {}

  public async execute(): Promise<FetchTimelinePostsResponse> {
    const timelinePosts = await this.postsRepository.fetchManyRecent();

    return right({
      timelinePosts,
    });
  }
}
