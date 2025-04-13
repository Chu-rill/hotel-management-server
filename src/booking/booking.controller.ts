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

@UseGuards(AuthGuard)
@Controller('bookings/:hotelId')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
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

  @Get('/:id')
  @UsePipes(new JoiValidationPipe(getBookingValidation, 'params'))
  findOne(@Param('id') id: string) {
    return this.bookingService.findOne(id);
  }

  @Delete('/:id')
  @UsePipes(new JoiValidationPipe(deleteBookingValidation, 'params'))
  remove(@Param('id') id: string) {
    return this.bookingService.remove(id);
  }
}
