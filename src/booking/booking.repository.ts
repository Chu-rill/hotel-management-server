import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infra/db/prisma.service';
import { Prisma, BookingStatus } from '@prisma/client';

@Injectable()
export class BookingRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createBooking(
    checkIn: Date,
    checkOut: Date,
    status: BookingStatus,
    customerId: number,
    roomId: number,
  ) {
    const booking = await this.prisma.booking.create({
      data: {
        checkIn,
        checkOut,
        status,
        customer: {
          connect: { id: customerId },
        },
        room: {
          connect: { id: roomId },
        },
      },
    });
    return booking;
  }

  async findBookings() {
    const bookings = await this.prisma.booking.findMany();
    return bookings;
  }

  async findBookingById(id: number) {
    const booking = await this.prisma.booking.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        checkIn: true,
        checkOut: true,
        status: true,
        customer: {
          select: {
            id: true, // Select the customerId
          },
        },
        room: {
          select: {
            id: true, // Select the customerId
          },
        },
      },
    });
    return booking;
  }

  async update(id: number, updatedBooking: Prisma.BookingUpdateInput) {
    const updated = await this.prisma.booking.update({
      where: { id },
      data: {
        ...updatedBooking,
      },
      select: {
        id: true,
        checkIn: true,
        checkOut: true,
        status: true,
        customer: {
          select: {
            id: true, // Select the customerId
          },
        },
        room: {
          select: {
            id: true, // Select the customerId
          },
        },
      },
    });
    return updated;
  }

  async delete(id: number) {
    const booking = await this.prisma.booking.delete({
      where: { id },
      select: {
        id: true,
        checkIn: true,
        checkOut: true,
        status: true,
        customer: {
          select: {
            id: true, // Select the customerId
          },
        },
        room: {
          select: {
            id: true, // Select the customerId
          },
        },
      },
    });
    return booking;
  }
}
