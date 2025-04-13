import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ReviewService } from './review.service';
import { AuthGuard } from 'src/guard/auth.guard';
import { JoiValidationPipe } from 'src/utils/schema-validation/validation.pipe';
import {
  createReviewValidation,
  deleteReviewValidation,
  getReviewValidation,
  getReviewValidationHotel,
} from './review.validation';
import { AdminGuard } from 'src/guard/admin.guard';

@UseGuards(AuthGuard)
@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  @UsePipes(new JoiValidationPipe(createReviewValidation, 'body'))
  create(@Body() createReviewDto: Prisma.ReviewCreateInput) {
    return this.reviewService.create(createReviewDto);
  }

  @Get('/:id')
  @UsePipes(new JoiValidationPipe(getReviewValidation, 'params'))
  findOne(@Param('id') id: number) {
    return this.reviewService.findOne(id);
  }

  @Get('/:hotelId')
  @UsePipes(new JoiValidationPipe(getReviewValidationHotel, 'params'))
  findOneByHotel(@Param('hotelId') id: string) {
    return this.reviewService.findReviewsByHotel(id);
  }

  @Delete('/:id')
  @UsePipes(new JoiValidationPipe(deleteReviewValidation, 'params'))
  remove(@Param('id') id: number) {
    return this.reviewService.remove(id);
  }
}
