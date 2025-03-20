import { Module } from '@nestjs/common';
import { HotelService } from './hotel.service';
import { HotelController } from './hotel.controller';
import { HotelRepository } from './hotel.repository';
import { DatabaseModule } from 'src/infra/db/database.module';

@Module({
  controllers: [HotelController],
  providers: [HotelService, HotelRepository],
  imports: [DatabaseModule],
})
export class HotelModule {}
