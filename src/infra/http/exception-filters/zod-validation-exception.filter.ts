import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { ZodValidationException } from 'nestjs-zod';
import { fromZodError } from 'zod-validation-error';

@Catch(ZodValidationException)
export class ZodValidationExceptionFilter implements ExceptionFilter {
  public catch(exception: ZodValidationException, host: ArgumentsHost) {
    const reply = host.switchToHttp().getResponse<FastifyReply>();
    const zodError = exception.getZodError();

    return reply.status(400).send({
      status: 'Bad Request',
      message: 'Data validation error',
      errors: fromZodError(zodError),
    });
  }
}
