import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { ReviewRepository } from './review.repository';
import { DatabaseModule } from 'src/infra/db/database.module';

@Module({
  controllers: [ReviewController],
  providers: [ReviewService, ReviewRepository],
  imports: [DatabaseModule],
  exports: [ReviewService],
})
export class ReviewModule {}
