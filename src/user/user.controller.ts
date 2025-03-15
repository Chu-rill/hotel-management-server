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
} from '@nestjs/common';
import { UserService } from './user.service';
import { Prisma } from '@prisma/client';
import { AuthGuard } from 'src/guard/auth.guard';
import { Request } from 'express';
import { AuthRequest } from 'src/types/auth.request';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: Prisma.UserCreateInput) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll(@Query('role') role?: 'ADMIN' | 'CUSTOMER' | 'STAFF') {
    return this.userService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.userService.getUser(id);
  }

  @Delete()
  @UseGuards(AuthGuard)
  remove(@Req() req: AuthRequest) {
    const userId = req.user.id;
    return this.userService.remove(userId);
  }
}
