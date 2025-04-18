import { BookingStatus } from '@prisma/client';
import * as Joi from 'joi';

export const createBookingValidation = Joi.object({
  checkIn: Joi.date().required().messages({
    'date.base': 'Check-in must be a valid date',
    'any.required': 'Check-in date is required',
  }),
  checkOut: Joi.date().greater(Joi.ref('checkIn')).required().messages({
    'date.base': 'Check-out must be a valid date',
    'date.greater': 'Check-out date must be after check-in date',
    'any.required': 'Check-out date is required',
  }),
  status: Joi.string().valid('VALID', 'EXPIRED').required().messages({
    'string.base': 'Status must be a string',
    'any.only':
      'Status must be one of [PENDING, CONFIRMED, CANCELLED, COMPLETED]',
    'any.required': 'Status is a required field',
  }),
  userId: Joi.string()
    .pattern(/^c[a-z0-9]{24}$/) // Matches CUID format
    .required()
    .messages({
      'string.pattern.base': 'ID must be a valid CUID',
      'string.empty': 'ID is required',
      'any.required': 'ID is a required field',
    }),
  roomId: Joi.string()
    .pattern(/^c[a-z0-9]{24}$/) // Matches CUID format
    .required()
    .messages({
      'string.pattern.base': 'ID must be a valid CUID',
      'string.empty': 'ID is required',
      'any.required': 'ID is a required field',
    }),
});
export type CreateBookingDto = {
  checkIn: Date;
  checkOut: Date;
  status: BookingStatus;
  userId: string;
  roomId: string;
  hotelId: string;
};
export const updateBookingValidation = Joi.object({
  checkIn: Joi.date().optional().messages({
    'date.base': 'Check-in must be a valid date',
  }),
  checkOut: Joi.date().greater(Joi.ref('checkIn')).optional().messages({
    'date.base': 'Check-out must be a valid date',
    'date.greater': 'Check-out date must be after check-in date',
  }),
  status: Joi.string().valid('VALID', 'EXPIRED').optional().messages({
    'string.base': 'Status must be a string',
    'any.only':
      'Status must be one of [PENDING, CONFIRMED, CANCELLED, COMPLETED]',
  }),
  userId: Joi.number().integer().positive().optional().messages({
    'number.base': 'Customer ID must be a valid number',
    'number.integer': 'Customer ID must be an integer',
    'number.positive': 'Customer ID must be a positive number',
  }),
  roomId: Joi.number().integer().positive().optional().messages({
    'number.base': 'Room ID must be a valid number',
    'number.integer': 'Room ID must be an integer',
    'number.positive': 'Room ID must be a positive number',
  }),
});
export type UpdateBookingDto = {
  checkIn?: Date;
  checkOut?: Date;
  status?: BookingStatus;
  userId?: string;
  roomId?: string;
};
export const getBookingValidation = Joi.object({
  id: Joi.number().integer().positive().required().messages({
    'number.base': 'ID must be a valid number',
    'number.integer': 'ID must be an integer',
    'number.positive': 'ID must be a positive number',
    'any.required': 'ID is a required field',
  }),
});

export const deleteBookingValidation = Joi.object({
  id: Joi.number().integer().positive().required().messages({
    'number.base': 'ID must be a valid number',
    'number.integer': 'ID must be an integer',
    'number.positive': 'ID must be a positive number',
    'any.required': 'ID is a required field',
  }),
});

export const hotelIdValidation = Joi.object({
  hotelId: Joi.string()
    .pattern(/^c[a-z0-9]{24}$/) // Matches CUID format
    .required()
    .messages({
      'string.pattern.base': 'ID must be a valid CUID',
      'string.empty': 'ID is required',
      'any.required': 'ID is a required field',
    }),
});
