import { HttpStatus, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ReviewRepository } from './review.repository';

@Injectable()
export class ReviewService {
  constructor(private reviewRepository: ReviewRepository) {}

  async create(createDto: Prisma.ReviewCreateInput) {
    const review = await this.reviewRepository.createReview(
      createDto.rating,
      createDto.comment,
      createDto.customer,
      createDto.hotel,
    );
    if (!review) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Failed to create review',
        data: null,
      };
    }
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Review created successfully',
      data: review,
    };
  }

  async findAll() {
    const reviews = await this.reviewRepository.findAll();

    if (!reviews || reviews.length === 0) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'No reviews found',
        data: null,
      };
    }

    return {
      statusCode: HttpStatus.OK,
      message: 'Reviews retrieved successfully',
      data: reviews,
    };
  }

  async findOne(id: number) {
    const review = await this.reviewRepository.findById(id);

    if (!review) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: `Review with ID ${id} not found`,
        data: null,
      };
    }

    return {
      statusCode: HttpStatus.OK,
      message: 'Review retrieved successfully',
      data: review,
    };
  }

  async findReviewsByHotel(hotelId: number) {
    const review = await this.reviewRepository.findReviewsByHotel(hotelId);

    if (!review) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: `Review for hotel not found`,
        data: null,
      };
    }

    return {
      statusCode: HttpStatus.OK,
      message: 'Review retrieved successfully',
      data: review,
    };
  }

  async remove(id: number) {
    const deletedReview = await this.reviewRepository.delete(id);

    if (!deletedReview) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: `Failed to delete review with ID ${id}`,
        data: null,
      };
    }

    return {
      statusCode: HttpStatus.OK,
      message: 'Review deleted successfully',
      data: deletedReview,
    };
  }
}
