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
    roomNumber: number,
    hotelId: string,
  ) {
    const room = await this.prisma.room.create({
      data: {
        roomtype,
        price,
        status,
        roomNumber,
        hotelId,
      },
      include: {
        hotel: true,
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

  async findRoomByRoomNumber(roomNumber: number, hotelId: string) {
    const room = await this.prisma.room.findFirst({
      where: {
        AND: [
          { roomNumber },
          { hotelId }, // Assuming your Room model has a hotelId field
        ],
      },
      select: {
        id: true,
        roomNumber: true,
        roomtype: true,
        price: true,
        status: true,
        hotel: true,
        amenity: true,
      },
    });
    return room;
  }

  async update(id: string, updatedUser: Prisma.RoomUpdateInput) {
    const updated = await this.prisma.room.update({
      where: { id },
      data: {
        ...updatedUser,
      },
      select: {
        id: true,
        roomNumber: true,
        roomtype: true,
        price: true,
        status: true,
        hotel: true,
        amenity: true,
        images: true,
      },
    });
    return updated;
  }

  async delete(id: string) {
    const room = await this.prisma.room.delete({
      where: { id },
      select: {
        id: true,
        roomNumber: true,
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
