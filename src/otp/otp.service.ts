import { Injectable } from '@nestjs/common';
import crypto from 'crypto';
import { OtpRepository } from './otp.repository';

@Injectable()
export class OtpService {
  constructor(private readonly otpRepository: OtpRepository) {}

  async generateOTP(userId: string): Promise<string> {
    const otpCode = crypto.randomInt(100000, 999999).toString(); // Generate a 6-digit OTP
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // OTP expires in 5 minutes

    const otp = await this.otpRepository.createOTP(userId, otpCode, expiresAt);

    if (!otp) {
      return 'Failed to create OTP';
    }

    return otpCode;
  }

  async verifyOTP(userId: string, enteredOTP: string) {
    const otpRecord = await this.otpRepository.getOTPDetails(userId);

    if (!otpRecord) return { success: false, message: 'OTP not found' };

    // Check if OTP is expired
    if (new Date() > otpRecord.expiresAt) {
      await this.otpRepository.deleteOTP(userId);
      return { success: false, message: 'OTP expired' };
    }

    // Check if OTP matches
    if (otpRecord.code !== enteredOTP) {
      return { success: false, message: 'Invalid OTP' };
    }

    // OTP is valid - Delete OTP after use
    await this.otpRepository.deleteOTP(userId);

    return { success: true, message: 'OTP verified successfully' };
  }
}
