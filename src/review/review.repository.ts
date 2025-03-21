import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infra/db/prisma.service';

@Injectable()
export class ReviewRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createReview(rating, comment, customerId, hotelId) {
    const review = await this.prisma.review.create({
      data: {
        rating,
        comment,
        customer: {
          connect: { id: customerId },
        },
        hotel: {
          connect: { id: hotelId },
        },
      },
    });
    return review;
  }

  async findAll() {
    const review = await this.prisma.review.findMany();
    return review;
  }

  async findById(id: number) {
    const review = await this.prisma.review.findUnique({
      where: { id },
      select: {
        rating: true,
        comment: true,
        customer: true,
      },
    });
    return review;
  }

  async findReviewsByHotel(hotelId: number) {
    const reviews = await this.prisma.review.findMany({
      where: {
        hotelId: hotelId,
      },
      select: {
        rating: true,
        comment: true,
        customer: true,
      },
      //   include: {
      //     customer: true, // Include customer details if needed
      //   },
    });
    return reviews;
  }

  async delete(id: number) {
    const review = await this.prisma.review.delete({
      where: { id },
      select: {
        rating: true,
        comment: true,
        customer: true,
      },
    });
    return review;
  }
}
