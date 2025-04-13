import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { DatabaseModule } from 'src/infra/db/database.module';
import { JwtModule } from '@nestjs/jwt';
import { HotelModule } from 'src/hotel/hotel.module';
import { BookingModule } from 'src/booking/booking.module';
import { ReviewModule } from 'src/review/review.module';
import { RoomModule } from 'src/room/room.module';
import { UserModule } from 'src/user/user.module';

@Module({
  controllers: [AdminController],
  providers: [AdminService],
  imports: [
    DatabaseModule,
    JwtModule.register({}),
    HotelModule,
    BookingModule,
    ReviewModule,
    RoomModule,
    UserModule,
  ],
})
export class AdminModule {}
