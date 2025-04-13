import {
  Controller,
  Get,
  Param,
  UseGuards,
  UsePipes,
  Query,
} from '@nestjs/common';
import { RoomService } from './room.service';
import { JoiValidationPipe } from 'src/utils/schema-validation/validation.pipe';
import { getHotelValidation, getRoomValidation } from './room.validation';
import { AuthGuard } from 'src/guard/auth.guard';

@UseGuards(AuthGuard)
@Controller('hotels/:hotelId/rooms')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  //get all rooms in a hotel
  @Get()
  @UsePipes(new JoiValidationPipe(getHotelValidation, 'params'))
  findAll(@Param('hotelId') hotelId: string) {
    return this.roomService.findAll(hotelId);
  }

  //get a single room by the roomNumber
  @Get('/:id')
  @UsePipes(new JoiValidationPipe(getRoomValidation, 'params'))
  findOne(@Param('id') id: number, @Query('hotelId') hotelId: string) {
    let roomNumber = parseInt(id.toString());
    return this.roomService.findOneById(roomNumber, hotelId);
  }
}
