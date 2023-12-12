import { IsPublicRoute } from '@Infra/auth/decorators/is-public-route.decorator';
import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';

@Controller('/health-check')
@IsPublicRoute()
export class HealthCheckController {
  @Get()
  @HttpCode(HttpStatus.OK)
  public check() {
    return {
      message: 'Social API online!',
    };
  }
}
