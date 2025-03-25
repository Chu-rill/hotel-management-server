import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infra/db/prisma.service';
import { Prisma, RoomType, Satus } from '@prisma/client';

@Injectable()
export class RoomRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createRoom(
    roomtype: RoomType,
    price: number,
    status: Satus,
    hotelId: string,
  ) {
    const room = await this.prisma.room.create({
      data: {
        roomtype,
        price,
        status,
        hotelId,
      },
    });
    return room;
  }

  async findRoomsByHotel(hotelId: string) {
    const room = await this.prisma.room.findMany({
      where: { hotelId },
    });
    return room;
  }

  async findRoomById(id: number, hotelId: string) {
    const room = await this.prisma.room.findFirst({
      where: {
        AND: [
          { id },
          { hotelId }, // Assuming your Room model has a hotelId field
        ],
      },
      select: {
        id: true,
        roomtype: true,
        price: true,
        status: true,
        hotel: true,
        amenity: true,
      },
    });
    return room;
  }

  async update(id: number, updatedUser: Prisma.RoomUpdateInput) {
    const updated = await this.prisma.room.update({
      where: { id },
      data: {
        ...updatedUser,
      },
      select: {
        id: true,
        roomtype: true,
        price: true,
        status: true,
        hotel: true,
        amenity: true,
      },
    });
    return updated;
  }

  async delete(id: number) {
    const room = await this.prisma.room.delete({
      where: { id },
      select: {
        id: true,
        roomtype: true,
        price: true,
        status: true,
        hotel: true,
        amenity: true,
      },
    });
    return room;
  }
}
