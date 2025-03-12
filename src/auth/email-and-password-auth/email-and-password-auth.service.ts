import { HttpStatus, Injectable } from '@nestjs/common';
import { LoginDto, SignUpDto } from './dto/auth.dto';
import { UserRepository } from 'src/user/user.repository';
import { JwtService } from '@nestjs/jwt';
import {
  encrypt,
  comparePassword,
} from 'src/utils/helper-functions/encryption';
import { first } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    private userRespository: UserRepository,
    private jwt: JwtService,
  ) {}
  async signup(dto: SignUpDto) {
    //this is use to signup a new user nad based on the role of the user it makes them a customer,staff or admin
    let existingUser = await this.userRespository.findUserByEmail(dto.email);
    if (existingUser) {
      return {
        statusCode: HttpStatus.CONFLICT,
        message: 'email already exist',
        data: null,
      };
    }
    const hassedPassword = await encrypt(dto.password);
    const user = await this.userRespository.createUser(
      dto.firstName,
      dto.lastName,
      dto.email,
      hassedPassword,
      dto.phone,
      dto.role,
    );
    let profile;
    if (user.role == 'STAFF') {
      profile = await this.userRespository.createStaff(user.id, dto.hotelId);
    }
    profile = await this.userRespository.createCustomer(user.id);

    const login = await this.login({
      email: dto.email,
      password: dto.password,
    });
    return {
      statusCode: HttpStatus.CREATED,
      message: 'user signup',
      data: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
      token: login.token,
    };
  }

  async login(dto: LoginDto) {
    const user = await this.userRespository.findUserByEmail(dto.email);
    if (!user) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'user not found',
        data: null,
      };
    }
    const isPasswordValid = await comparePassword(dto.password, user.password);
    if (!isPasswordValid) {
      return {
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'invalid password',
        data: null,
      };
    }
    let { password: userPassword, ...userWithoutPassword } = user;
    const payload = {
      ...userWithoutPassword, // Spread the rest of the user properties
    };
    // const payload = {
    //   sub: user.id,
    //   username: user.firstName,
    // };
    const token = await this.jwt.signAsync(payload);
    return {
      statusCode: HttpStatus.OK,
      message: 'login successful',
      data: {
        id: user.id,
        firstName: user.firstName,
      },
      token: token,
    };
  }
}
