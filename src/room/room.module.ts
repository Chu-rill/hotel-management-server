import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { RoomRepository } from './room.repository';
import { DatabaseModule } from 'src/infra/db/database.module';

@Module({
  controllers: [RoomController],
  providers: [RoomService, RoomRepository],
  imports: [DatabaseModule],
})
export class RoomModule {}
