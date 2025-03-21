import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  UsePipes,
  Put,
} from '@nestjs/common';
import { RoomService } from './room.service';
import { Prisma } from '@prisma/client';
import { AdminGuard } from 'src/guard/admin.guard';
import { JoiValidationPipe } from 'src/utils/schema-validation/validation.pipe';
import {
  createRoomValidation,
  deleteRoomValidation,
  getRoomValidation,
  updateRoomValidation,
} from './room.validation';
import { AuthGuard } from 'src/guard/auth.guard';

@Controller('rooms')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post()
  @UseGuards(AdminGuard)
  @UsePipes(new JoiValidationPipe(createRoomValidation, 'body'))
  create(@Body() createRoomDto: Prisma.RoomCreateInput) {
    return this.roomService.create(createRoomDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll() {
    return this.roomService.findAll();
  }

  @Get('/:id')
  @UseGuards(AuthGuard)
  @UsePipes(new JoiValidationPipe(getRoomValidation, 'params'))
  findOne(@Param('id') id: number) {
    return this.roomService.findOneById(id);
  }

  @Put('/:id')
  @UseGuards(AdminGuard)
  @UsePipes(new JoiValidationPipe(updateRoomValidation, 'params'))
  update(
    @Param('id') id: number,
    @Body() updateRoomDto: Prisma.RoomUpdateInput,
  ) {
    return this.roomService.update(id, updateRoomDto);
  }

  @Delete('/:id')
  @UseGuards(AdminGuard)
  @UsePipes(new JoiValidationPipe(deleteRoomValidation, 'params'))
  remove(@Param('id') id: number) {
    return this.roomService.remove(id);
  }
}
