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
    //this is use to signup a new user nad based on the role of the user it makes them a customer,staff or admin
    const hassedPassword = await this.hashService.hashPassword(dto.password);
    const user = await this.userRespository.createUser(
      dto.firstName,
      dto.lastName,
      dto.email,
      hassedPassword,
      dto.phone,
      dto.role,
    );
    let profile;
    if (user.role == 'CUSTOMER') {
      profile = await this.userRespository.createCustomer(user.id);
    } else if (user.role == 'STAFF') {
      profile = await this.userRespository.createStaff(user.id, dto.hotelId);
    }
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
    };
  }

  login(dto: LoginDto) {
    return `This action returns all auth`;
  }
}
