import { Controller, Post, Body, UseGuards, Get, Req } from '@nestjs/common';
import { OauthService } from './oauth.service';
import { GoogleGuard } from 'src/guard/google.guard';

@Controller('oauth')
export class OauthController {
  constructor(private readonly oauthService: OauthService) {}

  @Get('google')
  @UseGuards(GoogleGuard)
  async googleAuth(@Req() req) {
    // This triggers the Google OAuth flow
  }

  @Get('google/callback')
  @UseGuards(GoogleGuard)
  async googleAuthRedirect(@Req() req) {
    return this.oauthService.validateOAuthLogin(req);
  }
}
