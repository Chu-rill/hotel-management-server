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
import { AdminGuard } from 'src/guard/admin.guard';
import { JoiValidationPipe } from 'src/utils/schema-validation/validation.pipe';
import {
  CreateRoomDto,
  createRoomValidation,
  deleteRoomValidation,
  getHotelValidation,
  getRoomValidation,
  updateRoomDto,
  updateRoomValidation,
} from './room.validation';
import { AuthGuard } from 'src/guard/auth.guard';

@Controller('rooms')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post()
  @UseGuards(AdminGuard)
  @UsePipes(new JoiValidationPipe(createRoomValidation, 'body'))
  create(@Body() createRoomDto: CreateRoomDto) {
    return this.roomService.create(createRoomDto);
  }

  @Get('/:hotelId')
  @UseGuards(AuthGuard)
  @UsePipes(new JoiValidationPipe(getHotelValidation, 'params'))
  findAll(@Param('hotelId') hotelId: string) {
    return this.roomService.findAll(hotelId);
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
  update(@Param('id') id: number, @Body() updateRoomDto: updateRoomDto) {
    return this.roomService.update(id, updateRoomDto);
  }

  @Delete('/:id')
  @UseGuards(AdminGuard)
  @UsePipes(new JoiValidationPipe(deleteRoomValidation, 'params'))
  remove(@Param('id') id: number) {
    return this.roomService.remove(id);
  }
}
