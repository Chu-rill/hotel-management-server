import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infra/db/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(roomNumber, roomtype, price, status, hotelId) {
    const room = await this.prisma.room.create({
      data: {
        roomNumber,
        roomtype,
        price,
        status, // Ensure to hash the password in production
        hotelId,
      },
    });
    return room;
  }

  async findRoomById(id: string) {
    const room = await this.prisma.room.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        role: true,
        isVerified: true,
      },
    });
    return room;
  }
  async update(id: string, updatedUser: Prisma.UserUpdateInput) {
    const updated = await this.prisma.room.update({
      where: { id },
      data: {
        ...updatedUser,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        password: true,
        profile: true,
        phone: true,
        role: true,
        isVerified: true,
      },
    });
    return updated;
  }

  async delete(id: string) {
    const room = await this.prisma.room.delete({
      where: { id },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        password: true,
        phone: true,
        role: true,
        isVerified: true,
      },
    });
    return room;
  }
}
