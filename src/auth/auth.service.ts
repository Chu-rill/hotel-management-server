import { HttpStatus, Injectable } from '@nestjs/common';
import { LoginDto, SignUpDto } from './dto/auth.dto';
import { UserRepository } from 'src/user/user.repository';
import { HashService } from './hash.service';
import { first } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    private userRespository: UserRepository,
    private readonly hashService: HashService,
  ) {}
  async signup(dto: SignUpDto) {
    const hassedPassword = await this.hashService.hashPassword(dto.password);
    const user = await this.userRespository.createUser(
      dto.firstName,
      dto.lastName,
      dto.email,
      hassedPassword,
      dto.phone,
      dto.role,
    );
    return {
      statusCode: HttpStatus.CREATED,
      message: 'user signup',
      data: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    };
  }

  login(dto: LoginDto) {
    return `This action returns all auth`;
  }
}
