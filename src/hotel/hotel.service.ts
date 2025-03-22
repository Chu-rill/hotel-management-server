import { HttpStatus, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { HotelRepository } from './hotel.repository';

@Injectable()
export class HotelService {
  constructor(private hotelRepository: HotelRepository) {}

  async create(createDto: Prisma.HotelCreateInput) {
    let existingHotel = await this.hotelRepository.findHotelByName(
      createDto.name,
    );
    if (existingHotel) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Hotel Already Exist',
        data: null,
      };
    }
    const hotel = await this.hotelRepository.createHotel(
      createDto.name,
      createDto.address,
      createDto.city,
      createDto.country,
      createDto.phone,
      createDto.email,
    );
    if (!hotel) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Failed to create hotel',
        data: null,
      };
    }
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Hotel created',
      data: hotel,
    };
  }

  async findAll() {
    const hotels = await this.hotelRepository.findHotels();
    if (!hotels || hotels.length === 0) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'No hotels found',
        data: null,
      };
    }
    return {
      statusCode: HttpStatus.OK,
      message: 'Hotels retrieved successfully ',
      data: hotels,
    };
  }

  async findOne(id: string) {
    const hotel = await this.hotelRepository.findHotelById(id);
    if (!hotel) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Failed to find hotel',
        data: null,
      };
    }
    return {
      statusCode: HttpStatus.OK,
      message: 'Hotel retrieved successfully ',
      data: hotel,
    };
  }

  async update(id: string, updateDto: Prisma.HotelUpdateInput) {
    const hotel = await this.hotelRepository.updateHotel(id, updateDto);
    if (!hotel) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Failed to update hotel',
        data: null,
      };
    }
    return {
      statusCode: HttpStatus.OK,
      message: 'Hotels updated successfully',
      data: hotel,
    };
  }

  async remove(id: string) {
    const hotel = await this.hotelRepository.deleteHotel(id);
    if (!hotel) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Failed to delete hotel',
        data: null,
      };
    }
    return {
      statusCode: HttpStatus.OK,
      message: 'Hotel deleted successfully ',
      data: hotel,
    };
  }
}
