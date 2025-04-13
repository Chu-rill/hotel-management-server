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
import { AuthGuard } from 'src/guard/auth.guard';
import { JoiValidationPipe } from 'src/utils/schema-validation/validation.pipe';
import { getHotelValidation } from './hotel.validation';

@UseGuards(AuthGuard)
@Controller('hotels')
export class HotelController {
  constructor(private readonly hotelService: HotelService) {}

  @Get()
  async findAll() {
    return this.hotelService.findAll();
  }

  @Get('/:id')
  @UsePipes(new JoiValidationPipe(getHotelValidation, 'params'))
  async findOne(@Param('id') id: string) {
    return this.hotelService.findOne(id);
  }
}
