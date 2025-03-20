import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  UseGuards,
  Req,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Prisma } from '@prisma/client';
import { AuthGuard } from 'src/guard/auth.guard';
import { Request } from 'express';
import { AuthRequest } from 'src/types/auth.request';
import { FileInterceptor } from '@nestjs/platform-express';
import { AdminGuard } from 'src/guard/admin.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  @UseGuards(AdminGuard)
  async findAll() {
    return this.userService.findAll();
  }

  @Get()
  @UseGuards(AuthGuard)
  async findOne(@Req() req: AuthRequest) {
    const id = req.user.id;
    return this.userService.getUser(id);
  }

  @Delete()
  @UseGuards(AuthGuard)
  async remove(@Req() req: AuthRequest) {
    const userId = req.user.id;
    return this.userService.remove(userId);
  }

  @Post('/profile')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: AuthRequest,
  ) {
    const userId = req.user?.id;
    return this.userService.uploadProfileImage(userId, file);
  }
}
