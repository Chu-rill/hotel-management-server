import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { BookingRepository } from './booking.repository';
import { DatabaseModule } from 'src/infra/db/database.module';

@Module({
  controllers: [BookingController],
  providers: [BookingService, BookingRepository],
  imports: [DatabaseModule],
})
export class BookingModule {}
