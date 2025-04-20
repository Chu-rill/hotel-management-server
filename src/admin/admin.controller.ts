import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UsePipes,
  Put,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { AdminGuard } from 'src/guard/admin.guard';
import { HotelService } from 'src/hotel/hotel.service';
import { JoiValidationPipe } from 'src/utils/schema-validation/validation.pipe';
import {
  createHotelValidation,
  deleteHotelValidation,
  updateHotelValidation,
} from 'src/hotel/hotel.validation';
import { Prisma } from '@prisma/client';
import { BookingService } from 'src/booking/booking.service';
import {
  UpdateBookingDto,
  updateBookingValidation,
} from 'src/booking/booking.validation';
import { ReviewService } from 'src/review/review.service';
import { RoomService } from 'src/room/room.service';
import {
  CreateRoomDto,
  createRoomValidation,
  deleteRoomValidation,
  hotelIdValidation,
  updateRoomDto,
  updateRoomValidation,
} from 'src/room/room.validation';
import { FilesInterceptor } from '@nestjs/platform-express';
import { UserService } from 'src/user/user.service';

@UseGuards(AdminGuard)
@Controller('admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly hotelService: HotelService,
    private readonly bookingService: BookingService,
    private readonly reviewService: ReviewService,
    private readonly roomService: RoomService,
    private readonly userService: UserService,
  ) {}

  //HOTEL
  //create a hotel
  @Post('/hotels')
  @UsePipes(new JoiValidationPipe(createHotelValidation, 'body'))
  async create(@Body() createHotelDto: Prisma.HotelCreateInput) {
    return this.hotelService.create(createHotelDto);
  }

  //update a hotel
  @Put('/hotels/:id')
  @UsePipes(new JoiValidationPipe(updateHotelValidation, 'params'))
  async updateHotel(
    @Param('id') id: string,
    @Body() updateHotelDto: Prisma.HotelUpdateInput,
  ) {
    return this.hotelService.update(id, updateHotelDto);
  }

  //delete a hotel
  @Delete('/hotels/:id')
  @UsePipes(new JoiValidationPipe(deleteHotelValidation, 'params'))
  async remove(@Param('id') id: string) {
    return this.hotelService.remove(id);
  }

  //BOOKING
  //get booking for a single hotel
  @Get('/bookings/:hotelId')
  findAll(@Param('hotelId') hotelId: string) {
    return this.bookingService.findAll(hotelId);
  }

  //update a booking
  @Put('/bookings/:id')
  @UsePipes(new JoiValidationPipe(updateBookingValidation, 'params'))
  updateBooking(
    @Param('id') id: string,
    @Body() updateBookingDto: UpdateBookingDto,
  ) {
    return this.bookingService.update(id, updateBookingDto);
  }

  //get all reviews
  @Get('/reviews')
  findAllReviews() {
    return this.reviewService.findAll();
  }

  //ROOMS
  //create a room
  @Post('/hotels/:hotelId/rooms')
  @UsePipes(new JoiValidationPipe(hotelIdValidation, 'params'))
  @UsePipes(new JoiValidationPipe(createRoomValidation, 'body'))
  createRoom(
    @Param('hotelId') hotelId: string,
    @Body() createRoomDto: CreateRoomDto,
  ) {
    return this.roomService.create({
      ...createRoomDto,
      hotelId,
    });
  }

  //update a single room by the id
  @Put('/hotels/:hotelId/rooms/:id')
  @UsePipes(new JoiValidationPipe(updateRoomValidation, 'params'))
  updateRoom(@Param('id') id: string, @Body() updateRoomDto: updateRoomDto) {
    return this.roomService.update(id, updateRoomDto);
  }

  //delete a room by an id
  @Delete('/hotels/:hotelId/rooms/:id')
  @UsePipes(new JoiValidationPipe(deleteRoomValidation, 'params'))
  removeRoom(@Param('id') id: string) {
    return this.roomService.remove(id);
  }

  //upload room images
  @Post('/hotels/:hotelId/rooms/:roomId/images')
  @UseInterceptors(FilesInterceptor('files', 10)) // 10 is max number of files
  async uploadRoomImages(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Param('roomId') roomId: string,
    @Param('hotelId') hotelId: string,
  ) {
    return this.roomService.uploadRoomImages(roomId, hotelId, files);
  }

  //get all users
  @Get('/users')
  async findAllUsers() {
    return this.userService.findAll();
  }
}
