import { HttpStatus, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { RoomRepository } from './room.repository';
import { CreateRoomDto, updateRoomDto } from './room.validation';

@Injectable()
export class RoomService {
  constructor(private roomRepository: RoomRepository) {}
  async create(createDto: CreateRoomDto) {
    const room = await this.roomRepository.createRoom(
      createDto.roomType,
      createDto.price,
      createDto.status,
      createDto.hotelId,
    );
    if (!room) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Failed to create Room',
        data: null,
      };
    }
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Room created',
      data: room,
    };
  }

  async findAll(hotelId: string) {
    const room = await this.roomRepository.findRoomsByHotel(hotelId);
    if (!room || room.length === 0) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'No rooms found',
        data: null,
      };
    }
    return {
      statusCode: HttpStatus.OK,
      message: 'Rooms retrieved successfully ',
      data: room,
    };
  }

  async findOneById(id: number) {
    const room = await this.roomRepository.findRoomById(id);
    if (!room) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: `Room with ID ${id} not found`,
        data: null,
      };
    }
    return {
      statusCode: HttpStatus.OK,
      message: 'Room retrieved successfully ',
      data: room,
    };
  }

  async update(id: number, updateDto: updateRoomDto) {
    const room = await this.roomRepository.update(id, updateDto);
    if (!room) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Failed to update room',
        data: null,
      };
    }
    return {
      statusCode: HttpStatus.OK,
      message: 'Room updated successfully',
      data: room,
    };
  }

  async remove(id: number) {
    const room = await this.roomRepository.delete(id);
    if (!room) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Failed to delete room',
        data: null,
      };
    }
    return {
      statusCode: HttpStatus.OK,
      message: 'Room deleted successfully ',
      data: room,
    };
  }
}
