import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/infra/db/prisma.service';
import { AuthRequest } from 'src/types/auth.request';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwt: JwtService,
    private readonly prisma: PrismaService,
  ) {}
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<AuthRequest>();
    const authHeader = request.headers.authorization; // Bearer token
    if (!authHeader) {
      return false;
    }
    const token = authHeader.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.jwt.verifyAsync(token);
      const user = await this.prisma.user.findUnique({
        where: {
          id: payload.id, // Ensure this matches the token payload
        },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          phone: true,
          role: true,
          isVerified: true,
        },
      });
      request.user = user;
      return true;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
