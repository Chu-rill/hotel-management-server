import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { BookingRepository } from './booking.repository';
import { DatabaseModule } from 'src/infra/db/database.module';
import { MailModule } from 'src/infra/mail/mail.module';
import { HotelModule } from 'src/hotel/hotel.module';

@Module({
  controllers: [BookingController],
  providers: [BookingService, BookingRepository],
  imports: [DatabaseModule, MailModule, HotelModule],
})
export class BookingModule {}
