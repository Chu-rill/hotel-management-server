import { Module } from '@nestjs/common';
import { AuthService } from './email-and-password-auth.service';
import { AuthController } from './email-and-password-auth.controller';
import { UserModule } from 'src/user/user.module';
// import { HashService } from './';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '2h' },
    }),
  ],
})
export class EmailAndPasswordAuthModule {}
