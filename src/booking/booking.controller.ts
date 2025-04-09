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
import { BookingService } from './booking.service';
import { AuthGuard } from 'src/guard/auth.guard';
import { JoiValidationPipe } from 'src/utils/schema-validation/validation.pipe';
import {
  CreateBookingDto,
  createBookingValidation,
  deleteBookingValidation,
  getBookingValidation,
  hotelIdValidation,
  UpdateBookingDto,
  updateBookingValidation,
} from './booking.validation';
import { AdminGuard } from 'src/guard/admin.guard';

@Controller('bookings/:hotelId')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  @UseGuards(AuthGuard)
  @UsePipes(new JoiValidationPipe(hotelIdValidation, 'params'))
  @UsePipes(new JoiValidationPipe(createBookingValidation, 'body'))
  create(
    @Param('hotelId') hotelId: string,
    @Body() createBookingDto: CreateBookingDto,
  ) {
    return this.bookingService.create({
      ...createBookingDto,
      hotelId,
    });
  }

  @Get()
  @UseGuards(AdminGuard)
  findAll(@Param('hotelId') hotelId: string) {
    return this.bookingService.findAll(hotelId);
  }

  @Get('/unapproved')
  @UseGuards(AdminGuard)
  findUnapproved(@Param('hotelId') hotelId: string) {
    return this.bookingService.findUnapproved(hotelId);
  }

  @Get('/:id')
  @UseGuards(AuthGuard)
  @UsePipes(new JoiValidationPipe(getBookingValidation, 'params'))
  findOne(@Param('id') id: string) {
    return this.bookingService.findOne(id);
  }

  @Put('/:id')
  @UseGuards(AdminGuard)
  @UsePipes(new JoiValidationPipe(updateBookingValidation, 'params'))
  update(@Param('id') id: string, @Body() updateBookingDto: UpdateBookingDto) {
    return this.bookingService.update(id, updateBookingDto);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard)
  @UsePipes(new JoiValidationPipe(deleteBookingValidation, 'params'))
  remove(@Param('id') id: string) {
    return this.bookingService.remove(id);
  }
}
