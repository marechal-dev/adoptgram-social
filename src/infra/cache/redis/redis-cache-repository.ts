import { Injectable } from '@nestjs/common';

import { CacheRepository } from '../cache-repository';

import { RedisService } from './redis.service';

@Injectable()
export class RedisCacheRepository implements CacheRepository {
  private readonly CACHE_TIME_TO_LIVE = 60 * 20; // 20 minutes

  public constructor(private readonly redis: RedisService) {}

  public async set(key: string, value: string): Promise<void> {
    await this.redis.set(key, value, 'EX', this.CACHE_TIME_TO_LIVE);
  }

  public get(key: string): Promise<string | null> {
    return this.redis.get(key);
  }

  public async delete(key: string): Promise<void> {
    await this.redis.del(key);
  }
}
