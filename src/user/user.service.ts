import { HttpStatus, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CloudinaryService } from 'src/infra/cloudinary/cloudinary.service';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private cloudinaryService: CloudinaryService,
  ) {}

  async findAll() {
    const users = await this.userRepository.findUsers();
    if (!users) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'No users found',
        data: null,
      };
    }
    // console.log(users);
    return {
      statusCode: HttpStatus.OK,
      message: 'Users retrieved successfully',
      data: users,
    };
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

  async remove(id: string) {
    const user = await this.userRepository.delete(id);
    if (!user) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'User does not exist',
        data: null,
      };
    }
    return {
      statusCode: HttpStatus.OK,
      message: 'User deleted successfully',
      data: user,
    };
  }
  async uploadProfileImage(userId: string, file: Express.Multer.File) {
    if (!file) {
      return {
        status: 'error',
        error: true,
        statusCode: 400,
        message: 'No file uploaded',
      };
    }
    try {
      // Upload file to Cloudinary
      const uploadResult = await this.cloudinaryService.uploadProfiles(file);

      // Update user profile with the uploaded image URL
      const user = await this.userRepository.update(userId, {
        profile: uploadResult.secure_url,
      });

      return {
        statusCode: HttpStatus.OK,
        message: 'Profile image uploaded successfully',
        data: user,
      };
    } catch (error) {
      console.error('Upload error:', error);
      return {
        statusCode: HttpStatus.OK,
        message: 'Error uploading profile image',
        data: null,
      };
    }
  }
}
