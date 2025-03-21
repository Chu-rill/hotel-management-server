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
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { AuthGuard } from 'src/guard/auth.guard';
import { JoiValidationPipe } from 'src/utils/schema-validation/validation.pipe';
import {
  createReviewValidation,
  deleteReviewValidation,
  getReviewValidation,
  getReviewValidationHotel,
} from './review.validation';
import { AdminGuard } from 'src/guard/admin.guard';

@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  @UseGuards(AuthGuard)
  @UsePipes(new JoiValidationPipe(createReviewValidation))
  create(@Body() createReviewDto: Prisma.ReviewCreateInput) {
    return this.reviewService.create(createReviewDto);
  }

  @Get()
  @UseGuards(AdminGuard)
  findAll() {
    return this.reviewService.findAll();
  }

  @Get('/:id')
  @UseGuards(AuthGuard)
  @UsePipes(new JoiValidationPipe(getReviewValidation))
  findOne(@Param('id') id: number) {
    return this.reviewService.findOne(id);
  }

  @Get('/:hotelId')
  @UseGuards(AuthGuard)
  @UsePipes(new JoiValidationPipe(getReviewValidationHotel))
  findOneByHotel(@Param('hotelId') id: number) {
    return this.reviewService.findReviewsByHotel(id);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard)
  @UsePipes(new JoiValidationPipe(deleteReviewValidation))
  remove(@Param('id') id: number) {
    return this.reviewService.remove(id);
  }
}
