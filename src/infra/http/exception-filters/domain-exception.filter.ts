import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { FastifyReply } from 'fastify';

import { DomainException } from '@Core/exceptions/domain-exception';

@Catch(DomainException)
export class DomainExceptionFilter implements ExceptionFilter {
  public catch(exception: DomainException, host: ArgumentsHost) {
    const reply = host.switchToHttp().getResponse<FastifyReply>();

    return reply.status(exception.status).send({
      message: exception.message,
    });
  }
}
