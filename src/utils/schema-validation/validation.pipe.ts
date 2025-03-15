import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { ObjectSchema } from 'joi';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private schema: ObjectSchema) {}

  transform(value: any) {
    const { error, value: validatedValue } = this.schema.validate(value, {
      abortEarly: false, // Show all validation errors
      stripUnknown: true, // Remove unknown fields
    });

    if (error) {
      throw new BadRequestException(
        error.details.map((err) => err.message).join(', '),
      );
    }

    return validatedValue;
  }
}
