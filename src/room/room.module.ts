import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { RoomRepository } from './room.repository';
import { DatabaseModule } from 'src/infra/db/database.module';
import { HotelModule } from 'src/hotel/hotel.module';
import { CloudinaryModule } from 'src/infra/cloudinary/cloudinary.module';

@Module({
  controllers: [RoomController],
  providers: [RoomService, RoomRepository],
  imports: [DatabaseModule, HotelModule, CloudinaryModule],
})
export class RoomModule {}
