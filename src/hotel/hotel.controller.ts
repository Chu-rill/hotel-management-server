import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Put,
} from '@nestjs/common';
import { HotelService } from './hotel.service';
import { Prisma } from '@prisma/client';
import { AdminGuard } from 'src/guard/admin.guard';
import { AuthGuard } from 'src/guard/auth.guard';

@Controller('hotels')
export class HotelController {
  constructor(private readonly hotelService: HotelService) {}

  @Post()
  @UseGuards(AdminGuard)
  async create(@Body() createHotelDto: Prisma.HotelCreateInput) {
    return this.hotelService.create(createHotelDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  async findAll() {
    return this.hotelService.findAll();
  }

  @Get('/:id')
  @UseGuards(AuthGuard)
  async findOne(@Param('id') id: number) {
    return this.hotelService.findOne(id);
  }

  @Put('/:id')
  @UseGuards(AdminGuard)
  async update(
    @Param('id') id: number,
    @Body() updateHotelDto: Prisma.HotelUpdateInput,
  ) {
    return this.hotelService.update(id, updateHotelDto);
  }

  @Delete('/:id')
  @UseGuards(AdminGuard)
  async remove(@Param('id') id: string) {
    return this.hotelService.remove(+id);
  }
}
