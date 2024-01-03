import { MediasRepository } from '@Domain/social-network/application/repositories/medias-repository';
import { PostsRepository } from '@Domain/social-network/application/repositories/posts-repository';
import { Post } from '@Domain/social-network/enterprise/entities/post';
import { PostWithMedias } from '@Domain/social-network/enterprise/entities/value-objects/post-with-medias';
import { TimelinePost } from '@Domain/social-network/enterprise/entities/value-objects/timeline-post';
import { CacheRepository } from '@Infra/cache/cache-repository';
import { Injectable } from '@nestjs/common';
import { sub } from 'date-fns';

import { PrismaPostMapper } from '../mappers/prisma-post-mapper';
import { PrismaPostWithMediasMapper } from '../mappers/prisma-post-with-medias-mapper';
import { PrismaTimelinePostMapper } from '../mappers/prisma-timeline-post-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaPostsRepository extends PostsRepository {
  private readonly TIMELINE_CACHE_KEY = 'timeline';
  private readonly RECENT_TIMESPAN_IN_MINUTES = 20;

  public constructor(
    private readonly prisma: PrismaService,
    private readonly cache: CacheRepository,
    private readonly mediasRepository: MediasRepository,
  ) {
    super();
  }

  public async create(post: Post): Promise<void> {
    await this.prisma.post.create({
      data: PrismaPostMapper.toPrisma(post),
    });

    await this.mediasRepository.createMany(post.medias.getItems());

    await this.cache.delete(this.TIMELINE_CACHE_KEY);
  }

  public async delete(postID: string): Promise<void> {
    await this.mediasRepository.deleteManyByPostID(postID);

    await this.prisma.post.delete({
      where: {
        id: postID,
      },
    });

    await this.cache.delete(this.TIMELINE_CACHE_KEY);
  }

  /**
   * This method is used to fetch the timeline posts.
   * It uses the current time to calculate a start time by subtracting the defined
   * constant from the current date, then it's used as a query parameter to fetch
   * the recent posts.
   */
  public async fetchManyRecent(): Promise<TimelinePost[]> {
    const cacheHit = await this.cache.get(this.TIMELINE_CACHE_KEY);

    if (cacheHit) {
      const cachedData = JSON.parse(cacheHit);

      return cachedData;
    }

    const now = new Date();
    const minutesAgo = sub(now, {
      minutes: this.RECENT_TIMESPAN_IN_MINUTES,
    });

    const rawTimelinePosts = await this.prisma.post.findMany({
      where: {
        createdAt: {
          gte: minutesAgo,
          lte: now,
        },
      },
      include: {
        organization: true,
        medias: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const timelinePosts = rawTimelinePosts.map(
      PrismaTimelinePostMapper.toDomain,
    );

    await this.cache.set(
      this.TIMELINE_CACHE_KEY,
      JSON.stringify(timelinePosts),
    );

    return timelinePosts;
  }

  public async fetchManyByOrganizationID(
    id: string,
  ): Promise<PostWithMedias[]> {
    const result = await this.prisma.post.findMany({
      where: {
        organizationId: id,
      },
      include: {
        medias: true,
      },
    });

    return result.map(PrismaPostWithMediasMapper.toDomain);
  }

  public async findByID(id: string): Promise<Post | null> {
    const rawPost = await this.prisma.post.findUnique({
      where: {
        id,
      },
    });

    if (!rawPost) {
      return null;
    }

    return PrismaPostMapper.toDomain(rawPost);
  }
}
