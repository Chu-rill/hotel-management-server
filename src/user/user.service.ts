import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

  async getUser(id: string) {
    const user = await this.userRepository.findUserById(id);
    if (!user) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'User not found',
        data: null,
      };
    }

    return {
      statusCode: HttpStatus.OK,
      message: 'User retrieved',
      data: user,
    };
  }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
