import { Injectable, HttpStatus } from '@nestjs/common';
import { BookingRepository } from './booking.repository';
import { CreateBookingDto, UpdateBookingDto } from './booking.validation';
import { HotelRepository } from 'src/hotel/hotel.repository';
import { MailService } from 'src/infra/mail/mail.service';

@Injectable()
export class BookingService {
  constructor(
    private bookingRepository: BookingRepository,
    private hotelRepository: HotelRepository,
    private mailService: MailService,
  ) {}

  async create(createDto: CreateBookingDto) {
    const hotel = await this.hotelRepository.findHotelById(createDto.hotelId);

    if (!hotel) {
      throw new Error('Hotel not found!');
    }
    const booking = await this.bookingRepository.createBooking(
      createDto.checkIn,
      createDto.checkOut,
      createDto.status,
      createDto.userId,
      createDto.roomId,
      createDto.hotelId,
    );

    if (!booking) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Failed to create booking',
        data: null,
      };
    }

    const data = {
      subject: 'Booking Confirmation',
      username: booking.user.username,
      bookingId: booking.id,
      hotelName: hotel.name,
      checkIn: booking.checkIn,
      checkOut: booking.checkOut,
      roomType: booking.room.roomtype,
      roomNumber: booking.room.roomNumber,
      status: booking.status,
    };

    await this.mailService.sendBookingEmail(booking.user.email, data);

    return {
      statusCode: HttpStatus.CREATED,
      message: 'Booking created successfully',
      data: booking,
    };
  }

  async findAll(id: string) {
    const bookings = await this.bookingRepository.findBookings(id);

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

  async findOne(id: string) {
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

  async update(id: string, updateDto: UpdateBookingDto) {
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

  async remove(id: string) {
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
