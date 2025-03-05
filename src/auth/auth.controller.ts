import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, SignUpDto } from './dto/auth.dto';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  SignUp(@Body() dto: SignUpDto) {
    return this.authService.signup(dto);
  }

  @Post()
  Login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }
}
