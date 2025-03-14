import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthService } from './email-and-password-auth.service';
import { LoginDto, OTPDto, ResendDto, SignUpDto } from './dto/auth.dto';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  SignUp(@Body() dto: SignUpDto) {
    return this.authService.signup(dto);
  }

  @Post('/login')
  Login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post('/validateOTP')
  ValidateOTP(@Body() dto: OTPDto) {
    return this.authService.validateOTP(dto);
  }

  @Post('/resendOTP')
  resendOTP(@Body() dto: ResendDto) {
    return this.authService.resendOTP(dto);
  }
}
