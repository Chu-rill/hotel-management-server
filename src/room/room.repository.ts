import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infra/db/prisma.service';
import { Prisma, RoomType, Satus } from '@prisma/client';

@Injectable()
export class RoomRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createRoom(
    roomNumber: string,
    roomtype: RoomType,
    price: number,
    status: Satus,
    hotelId: number,
  ) {
    const room = await this.prisma.room.create({
      data: {
        roomNumber,
        roomtype,
        price,
        status,
        hotelId,
      },
    });
    return room;
  }

  async findRooms() {
    const room = await this.prisma.room.findMany();
    return room;
  }

  async findRoomById(id: number) {
    const room = await this.prisma.room.findUnique({
      where: {
        id,
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

  async findRoomByRoomNumber(roomNumber: string) {
    const room = await this.prisma.room.findFirst({
      where: {
        roomNumber,
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

  async update(id: number, updatedUser: Prisma.RoomUpdateInput) {
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
      },
    });
    return updated;
  }

  async delete(id: number) {
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
