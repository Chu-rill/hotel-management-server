import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: DatabaseService) {}

  async createUser(firstName, lastName, email, password, phone, role) {
    const user = await this.prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password, // Ensure to hash the password in production
        phone,
        role,
      },
    });
    return user;
  }
  async createCustomer(userId) {
    const profile = await this.prisma.customer.create({
      data: {
        userId: userId,
      },
    });
    return profile;
  }

  async createStaff(userId, hotelId) {
    const profile = await this.prisma.staff.create({
      data: {
        userId: userId,
        hotelId: hotelId,
      },
    });
    return profile;
  }
  async findUserByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  }
  async findUserById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
    return user;
  }
}
