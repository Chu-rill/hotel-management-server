import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infra/db/prisma.service';

@Injectable()
export class OtpRepository {
  constructor(private readonly prisma: PrismaService) {}
  otpReturnObject = {
    code: true,
    email: true,
    expiresAt: true,
    createdAt: true,
  };

  async createOTP(userId: string, code: string, expiresAt: Date) {
    const otp = await this.prisma.otp.upsert({
      where: { userId },
      update: { code, expiresAt },
      create: { userId, code, expiresAt },

      select: this.otpReturnObject,
    });
    return otp;
  }

  async getOTPDetails(userId: string) {
    const otp = await this.prisma.otp.findUnique({
      where: { userId },
    });
    return otp;
  }

  async deleteOTP(userId: string) {
    const otp = await this.prisma.otp.delete({
      where: { userId },
      select: this.otpReturnObject,
    });
    return otp;
  }
}
