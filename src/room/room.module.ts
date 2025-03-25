import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { RoomRepository } from './room.repository';
import { DatabaseModule } from 'src/infra/db/database.module';
import { HotelModule } from 'src/hotel/hotel.module';

@Module({
  controllers: [RoomController],
  providers: [RoomService, RoomRepository],
  imports: [DatabaseModule, HotelModule],
})
export class RoomModule {}
