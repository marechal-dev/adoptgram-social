import { env } from '@Configs/env';
import { ArgumentsHost, Catch, ExceptionFilter, Logger } from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { ZodValidationException } from 'nestjs-zod';
import { fromZodError } from 'zod-validation-error';

@Catch(ZodValidationException)
export class ZodValidationExceptionFilter implements ExceptionFilter {
  private readonly logger: Logger = new Logger(
    ZodValidationExceptionFilter.name,
  );

  public catch(exception: ZodValidationException, host: ArgumentsHost) {
    const reply = host.switchToHttp().getResponse<FastifyReply>();
    const zodError = exception.getZodError();

    if (env.NODE_ENV === 'development') {
      this.logger.debug(zodError);
    }

    return reply.status(400).send({
      status: 'Bad Request',
      message: 'Data validation error',
      errors: fromZodError(zodError),
    });
  }
}
