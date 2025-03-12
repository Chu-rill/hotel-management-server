import { Injectable } from '@nestjs/common';

@Injectable()
export class OauthService {
  googleLogin(req) {
    if (!req) {
      return 'No user from google';
    }
    return {
      message: 'User Info from Google',
      user: req.user,
    };
  }
}
