import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { ZodValidationException } from 'nestjs-zod';
import { FastifyReply } from 'fastify';

@Catch(ZodValidationException)
export class ZodValidationExceptionFilter implements ExceptionFilter {
  public catch(exception: ZodValidationException, host: ArgumentsHost) {
    const reply = host.switchToHttp().getResponse<FastifyReply>();

    return reply.status(HttpStatus.BAD_REQUEST).send({
      message: 'Falha na validação dos dados',
      errors: exception.getZodError().format(),
    });
  }
}
