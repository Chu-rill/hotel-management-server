import { Module } from '@nestjs/common';
import { OtpService } from './otp.service';
import { OtpController } from './otp.controller';
import { DatabaseModule } from 'src/database/database.module';
import { OtpRepository } from './otp.repository';

@Module({
  controllers: [OtpController],
  providers: [OtpService, OtpRepository],
  imports: [DatabaseModule],
})
export class OtpModule {}
