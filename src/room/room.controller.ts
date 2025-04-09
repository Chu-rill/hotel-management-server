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
  Query,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
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
  hotelIdValidation,
  updateRoomDto,
  updateRoomValidation,
} from './room.validation';
import { AuthGuard } from 'src/guard/auth.guard';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { AuthRequest } from 'src/types/auth.request';

@Controller('hotels/:hotelId/rooms')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  //create a room
  @Post()
  @UseGuards(AdminGuard)
  @UsePipes(new JoiValidationPipe(hotelIdValidation, 'params'))
  @UsePipes(new JoiValidationPipe(createRoomValidation, 'body'))
  create(
    @Param('hotelId') hotelId: string,
    @Body() createRoomDto: CreateRoomDto,
  ) {
    return this.roomService.create({
      ...createRoomDto,
      hotelId,
    });
  }

  //get all rooms in a hotel
  @Get()
  @UseGuards(AuthGuard)
  @UsePipes(new JoiValidationPipe(getHotelValidation, 'params'))
  findAll(@Param('hotelId') hotelId: string) {
    return this.roomService.findAll(hotelId);
  }

  //get a single room by the roomNumber
  @Get('/:id')
  @UseGuards(AuthGuard)
  @UsePipes(new JoiValidationPipe(getRoomValidation, 'params'))
  findOne(@Param('id') id: number, @Query('hotelId') hotelId: string) {
    let roomNumber = parseInt(id.toString());
    return this.roomService.findOneById(roomNumber, hotelId);
  }

  //update a single room by the id
  @Put('/:id')
  @UseGuards(AdminGuard)
  @UsePipes(new JoiValidationPipe(updateRoomValidation, 'params'))
  update(@Param('id') id: string, @Body() updateRoomDto: updateRoomDto) {
    return this.roomService.update(id, updateRoomDto);
  }

  //delete a room by an id
  @Delete('/:id')
  @UseGuards(AdminGuard)
  @UsePipes(new JoiValidationPipe(deleteRoomValidation, 'params'))
  remove(@Param('id') id: string) {
    return this.roomService.remove(id);
  }

  @Post('/:roomId/images')
  @UseGuards(AdminGuard)
  @UseInterceptors(FilesInterceptor('files', 10)) // 10 is max number of files
  async uploadImages(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Param('roomId') roomId: string,
    @Param('hotelId') hotelId: string,
  ) {
    return this.roomService.uploadRoomImages(roomId, hotelId, files);
  }
}
