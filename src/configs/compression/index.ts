import { FastifyCompressOptions } from '@fastify/compress';

export const compressionConfigs: FastifyCompressOptions = {
  encodings: ['gzip', 'deflate'],
};
