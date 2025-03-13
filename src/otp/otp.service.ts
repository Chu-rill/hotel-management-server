import { Injectable } from '@nestjs/common';
import crypto from 'crypto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class OtpService {
  constructor(private readonly prisma: DatabaseService) {}

  async generateOTP(userId: string): Promise<string> {
    const otpCode = crypto.randomInt(100000, 999999).toString(); // Generate a 6-digit OTP
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // OTP expires in 5 minutes

    // Upsert (if OTP exists, update it; otherwise, create new)
    await this.prisma.oTP.upsert({
      where: { userId },
      update: { code: otpCode, expiresAt },
      create: { userId, code: otpCode, expiresAt },
    });

    return otpCode;
  }

  async verifyOTP(userId: string, enteredOTP: string) {
    const otpRecord = await this.prisma.oTP.findUnique({ where: { userId } });

    if (!otpRecord) return { success: false, message: 'OTP not found' };

    // Check if OTP is expired
    if (new Date() > otpRecord.expiresAt) {
      await this.prisma.oTP.delete({ where: { userId } }); // Delete expired OTP
      return { success: false, message: 'OTP expired' };
    }

    // Check if OTP matches
    if (otpRecord.code !== enteredOTP) {
      return { success: false, message: 'Invalid OTP' };
    }

    // OTP is valid - Delete OTP after use
    await this.prisma.oTP.delete({ where: { userId } });

    return { success: true, message: 'OTP verified successfully' };
  }
}
