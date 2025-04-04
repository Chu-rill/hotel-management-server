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
import { Prisma } from '@prisma/client';
import { AuthGuard } from 'src/guard/auth.guard';
import { JoiValidationPipe } from 'src/utils/schema-validation/validation.pipe';
import {
  createBookingValidation,
  deleteBookingValidation,
  getBookingValidation,
  updateBookingValidation,
} from './booking.validation';
import { AdminGuard } from 'src/guard/admin.guard';

@Controller('bookings')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  @UseGuards(AuthGuard)
  @UsePipes(new JoiValidationPipe(createBookingValidation, 'body'))
  create(@Body() createBookingDto: Prisma.BookingCreateInput) {
    return this.bookingService.create(createBookingDto);
  }

  @Get()
  @UseGuards(AdminGuard)
  findAll() {
    return this.bookingService.findAll();
  }

  @Get('/:id')
  @UseGuards(AuthGuard)
  @UsePipes(new JoiValidationPipe(getBookingValidation, 'params'))
  findOne(@Param('id') id: number) {
    return this.bookingService.findOne(id);
  }

  @Put('/:id')
  @UseGuards(AdminGuard)
  @UsePipes(new JoiValidationPipe(updateBookingValidation, 'params'))
  update(
    @Param('id') id: number,
    @Body() updateBookingDto: Prisma.BookingUpdateInput,
  ) {
    return this.bookingService.update(id, updateBookingDto);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard)
  @UsePipes(new JoiValidationPipe(deleteBookingValidation, 'params'))
  remove(@Param('id') id: number) {
    return this.bookingService.remove(id);
  }
}
