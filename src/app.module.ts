import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './infra/db/database.module';
import { EmailAndPasswordAuthModule } from './auth/email-and-password-auth/email-and-password-auth.module';
import { OauthModule } from './auth/oauth/oauth.module';
import { GoogleStrategy } from './auth/oauth/strategies/google.strategy';
import { OtpModule } from './otp/otp.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Make the ConfigModule global
      envFilePath: '.env', // Specify the path to your .env file
    }),
    EmailAndPasswordAuthModule,
    UserModule,
    DatabaseModule,
    OauthModule,
    OtpModule,
  ],
  controllers: [AppController],
  providers: [AppService, GoogleStrategy],
})
export class AppModule {}
