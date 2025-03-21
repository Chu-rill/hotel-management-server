import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infra/db/prisma.service';
import { Prisma, Role } from '@prisma/client';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    phone: string,
    role: Role,
  ) {
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

  async createUserOauth(
    firstName: string,
    lastName: string,
    email: string,
    profile: string,
  ) {
    const user = await this.prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        profile,
      },
    });
    return user;
  }
  async createCustomer(userId: string) {
    const profile = await this.prisma.customer.create({
      data: {
        userId: userId,
      },
    });
    return profile;
  }

  async createStaff(userId: string, hotelId: number) {
    const profile = await this.prisma.staff.create({
      data: {
        userId: userId,
        hotelId: hotelId,
      },
    });
    return profile;
  }

  async findUsers() {
    const users = await this.prisma.user.findMany();
    return users;
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
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        role: true,
        isVerified: true,
        Customer: {
          select: {
            id: true, // Select the customerId
          },
        },
      },
    });
    return user;
  }

  async update(id: string, updatedUser: Prisma.UserUpdateInput) {
    const updated = await this.prisma.user.update({
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

  async verifyUser(email: string) {
    const user = await this.prisma.user.update({
      where: { email },
      data: { isVerified: true },
    });
    return user;
  }

  async delete(id: string) {
    const user = await this.prisma.user.delete({
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
    return user;
  }
}
