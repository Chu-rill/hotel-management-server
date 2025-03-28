import { Injectable, HttpStatus } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { BookingRepository } from './booking.repository';

@Injectable()
export class BookingService {
  constructor(private bookingRepository: BookingRepository) {}

  async create(createDto: Prisma.BookingCreateInput) {
    const booking = await this.bookingRepository.createBooking(
      new Date(createDto.checkIn),
      new Date(createDto.checkOut),
      createDto.status,
      createDto.customer.connect?.id,
      createDto.room.connect?.id,
    );

    if (!booking) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Failed to create booking',
        data: null,
      };
    }

    return {
      statusCode: HttpStatus.CREATED,
      message: 'Booking created successfully',
      data: booking,
    };
  }

  async findAll() {
    const bookings = await this.bookingRepository.findBookings();

    if (!bookings || bookings.length === 0) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'No bookings found',
        data: null,
      };
    }

    return {
      statusCode: HttpStatus.OK,
      message: 'Bookings retrieved successfully',
      data: bookings,
    };
  }

  async findOne(id: number) {
    const booking = await this.bookingRepository.findBookingById(id);

    if (!booking) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: `Booking with ID ${id} not found`,
        data: null,
      };
    }

    return {
      statusCode: HttpStatus.OK,
      message: 'Booking retrieved successfully',
      data: booking,
    };
  }

  async update(id: number, updateDto: Prisma.BookingUpdateInput) {
    const updatedBooking = await this.bookingRepository.update(id, updateDto);

    if (!updatedBooking) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: `Failed to update booking with ID ${id}`,
        data: null,
      };
    }

    return {
      statusCode: HttpStatus.OK,
      message: 'Booking updated successfully',
      data: updatedBooking,
    };
  }

  async remove(id: number) {
    const deletedBooking = await this.bookingRepository.delete(id);

    if (!deletedBooking) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: `Failed to delete booking with ID ${id}`,
        data: null,
      };
    }

    return {
      statusCode: HttpStatus.OK,
      message: 'Booking deleted successfully',
      data: deletedBooking,
    };
  }
}
