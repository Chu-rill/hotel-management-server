import { HttpStatus, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { RoomRepository } from './room.repository';
import { CreateRoomDto, updateRoomDto } from './room.validation';
import { HotelRepository } from 'src/hotel/hotel.repository';
import { CloudinaryService } from 'src/infra/cloudinary/cloudinary.service';

@Injectable()
export class RoomService {
  constructor(
    private roomRepository: RoomRepository,
    private hotelRepository: HotelRepository,
    private cloudinaryService: CloudinaryService,
  ) {}
  async create(createDto: CreateRoomDto) {
    const hotel = await this.hotelRepository.findHotelById(createDto.hotelId);
    if (!hotel) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Hotel not found',
        data: null,
      };
    }
    const room = await this.roomRepository.createRoom(
      createDto.roomType,
      createDto.price,
      createDto.status,
      createDto.roomNumber,
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

  async findOneById(roomNumber: number, hotelId: string) {
    const room = await this.roomRepository.findRoomByRoomNumber(
      roomNumber,
      hotelId,
    );
    if (!room) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: `Room with Room Number ${roomNumber} not found`,
        data: null,
      };
    }
    return {
      statusCode: HttpStatus.OK,
      message: 'Room retrieved successfully ',
      data: room,
    };
  }

  async update(id: string, updateDto: updateRoomDto) {
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

  async remove(id: string) {
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

  async uploadRoomImages(
    roomId: string,
    hotelId: string,
    files: Express.Multer.File[],
  ) {
    if (!files || files.length === 0) {
      return {
        status: 'error',
        error: true,
        statusCode: 400,
        message: 'No files uploaded',
      };
    }
    try {
      const uploadResults = await Promise.all(
        files.map((file) => this.cloudinaryService.uploadImages(file)),
      );

      const imageUrls = uploadResults.map((result) => result.secure_url);

      // Update room images with the uploaded image URLs
      const room = await this.roomRepository.update(roomId, {
        images: imageUrls,
      });

      return {
        statusCode: HttpStatus.OK,
        message: 'Images uploaded successfully',
        data: room,
      };
    } catch (error) {
      console.error('Upload error:', error);
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error uploading room images',
        data: null,
      };
    }
  }
}
