import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Put,
  UsePipes,
} from '@nestjs/common';
import { HotelService } from './hotel.service';
import { Prisma } from '@prisma/client';
import { AdminGuard } from 'src/guard/admin.guard';
import { AuthGuard } from 'src/guard/auth.guard';
import { JoiValidationPipe } from 'src/utils/schema-validation/validation.pipe';
import {
  createHotelValidation,
  deleteHotelValidation,
  getHotelValidation,
  updateHotelValidation,
} from './hotel.validation';

@Controller('hotels')
export class HotelController {
  constructor(private readonly hotelService: HotelService) {}

  @Post()
  @UseGuards(AdminGuard)
  @UsePipes(new JoiValidationPipe(createHotelValidation))
  async create(@Body() createHotelDto: Prisma.HotelCreateInput) {
    return this.hotelService.create(createHotelDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  @UsePipes(new JoiValidationPipe(createHotelValidation))
  async findAll() {
    return this.hotelService.findAll();
  }

  @Get('/:id')
  @UseGuards(AuthGuard)
  @UsePipes(new JoiValidationPipe(getHotelValidation))
  async findOne(@Param('id') id: number) {
    return this.hotelService.findOne(id);
  }

  @Put('/:id')
  @UseGuards(AdminGuard)
  @UsePipes(new JoiValidationPipe(updateHotelValidation))
  async update(
    @Param('id') id: number,
    @Body() updateHotelDto: Prisma.HotelUpdateInput,
  ) {
    return this.hotelService.update(id, updateHotelDto);
  }

  @Delete('/:id')
  @UseGuards(AdminGuard)
  @UsePipes(new JoiValidationPipe(deleteHotelValidation))
  async remove(@Param('id') id: string) {
    return this.hotelService.remove(+id);
  }
}
