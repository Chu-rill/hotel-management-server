import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infra/db/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class HotelRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createHotel(
    name: string,
    address: string,
    city: string,
    country: string,
    phone: string,
    email: string,
  ) {
    const hotel = await this.prisma.hotel.create({
      data: {
        name,
        address,
        city,
        country,
        phone,
        email,
      },
    });
    return hotel;
  }

  async findHotelById(id: string) {
    const hotel = await this.prisma.hotel.findUnique({
      where: {
        id,
      },
      select: {
        name: true,
        address: true,
        city: true,
        country: true,
        phone: true,
        email: true,
        description: true,
        rating: true,
      },
    });
    return hotel;
  }

  async findHotelByName(name: string) {
    const hotel = await this.prisma.hotel.findUnique({
      where: {
        name,
      },
      select: {
        name: true,
        address: true,
        city: true,
        country: true,
        phone: true,
        email: true,
        description: true,
        rating: true,
      },
    });
    return hotel;
  }

  async findHotels() {
    const hotel = await this.prisma.hotel.findMany();
    return hotel;
  }

  async updateHotel(id: string, updateHotel: Prisma.HotelUpdateInput) {
    const updated = await this.prisma.hotel.update({
      where: { id },
      data: {
        ...updateHotel,
      },
      select: {
        name: true,
        address: true,
        city: true,
        country: true,
        phone: true,
        email: true,
        description: true,
        rating: true,
      },
    });
    return updated;
  }

  async deleteHotel(id: string) {
    const hotel = await this.prisma.hotel.delete({
      where: { id },
      select: {
        name: true,
        address: true,
        city: true,
        country: true,
        phone: true,
        email: true,
        description: true,
        rating: true,
      },
    });
    return hotel;
  }
}
