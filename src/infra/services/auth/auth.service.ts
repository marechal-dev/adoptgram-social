import {
  BadRequestException,
  Injectable,
  NotImplementedException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { compare } from 'bcrypt';

import { PrismaService } from '@Infra/persistence/prisma/prisma.service';
import { LoginDto } from '@Infra/http/dtos/auth/login.dto';

export type LoginResponse = {
  token: string;
};

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  public async login(loginDto: LoginDto): Promise<LoginResponse> {
    const payload = await this.generatePayload(loginDto);

    return payload;
  }

  private async generatePayload(loginDto: LoginDto): Promise<LoginResponse> {
    if (
      loginDto.kind !== 'Admin' &&
      loginDto.kind !== 'CommonUser' &&
      loginDto.kind !== 'Organization'
    ) {
      throw new BadRequestException('Tipo de Usuário não reconhecido.');
    }

    const signInPayload: LoginResponse = {
      token: '',
    };

    if (loginDto.kind === 'Admin') {
      throw new NotImplementedException();
    }

    if (loginDto.kind === 'CommonUser') {
      const user = await this.prisma.commonUser.findUnique({
        where: {
          email: loginDto.email,
        },
      });

      if (!user) {
        throw new UnauthorizedException('E-mail ou Senha incorreta.');
      }

      const passwordsMatch = await compare(
        loginDto.password,
        user.passwordHash,
      );

      if (!passwordsMatch) {
        throw new UnauthorizedException('E-mail ou Senha incorreta.');
      }

      const payload = {
        sub: user.id,
        username: user.username,
        email: user.email,
        kind: loginDto.kind,
      };

      signInPayload.token = await this.jwtService.signAsync(payload);
    }

    if (loginDto.kind === 'Organization') {
      const org = await this.prisma.organization.findUnique({
        where: {
          email: loginDto.email,
        },
      });

      if (!org) {
        throw new UnauthorizedException('E-mail ou Senha incorreta.');
      }

      const doPasswordsMatch = await compare(
        loginDto.password,
        org.passwordHash,
      );

      if (!doPasswordsMatch) {
        throw new UnauthorizedException('E-mail ou Senha incorreta.');
      }

      const payloadToSign = {
        sub: org.id,
        username: org.username,
        email: org.email,
        kind: loginDto.kind,
      };

      signInPayload.token = await this.jwtService.signAsync(payloadToSign);
    }

    return signInPayload;
  }
}
