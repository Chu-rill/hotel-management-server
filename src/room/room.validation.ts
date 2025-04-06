import { RoomType, Satus } from '@prisma/client';
import * as Joi from 'joi';

export const createRoomValidation = Joi.object({
  roomNumber: Joi.number().optional().messages({
    'string.base': 'Room Number must be a number',
    'string.empty': 'Room Number is required',
    'any.required': 'Room Number is a required field',
  }),
  roomType: Joi.string()
    .valid('SINGLE', 'DOUBLE', 'SUITE')
    .optional()
    .messages({
      'string.base': 'Room Type must be a string',
      'string.empty': 'Room Type is required',
      'any.required': 'Room Type is a required field',
    }),
  price: Joi.number().positive().required().messages({
    'number.base': 'Price must be a valid number',
    'number.positive': 'Price must be a positive number',
    'any.required': 'Price is a required field',
  }),
  status: Joi.string()
    .valid('AVAILABLE', 'BOOKED', 'MAINTENANCE', 'OCCUPIED')
    .optional()
    .messages({
      'string.base': 'Status must be a string',
      'any.only': 'Status must be one of [available, occupied, maintenance]',
      'any.required': 'Status is a required field',
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

export type CreateRoomDto = {
  roomType?: RoomType;
  price: number;
  status?: Satus;
  roomNumber?: number;
  hotelId?: string;
};

export const updateRoomValidation = Joi.object({
  roomNumber: Joi.string().optional().messages({
    'string.base': 'Room Number must be a string',
  }),
  roomtype: Joi.string().optional().messages({
    'string.base': 'Room Type must be a string',
  }),
  price: Joi.number().positive().optional().messages({
    'number.base': 'Price must be a valid number',
    'number.positive': 'Price must be a positive number',
  }),
  status: Joi.string()
    .valid('available', 'occupied', 'maintenance')
    .optional()
    .messages({
      'string.base': 'Status must be a string',
      'any.only': 'Status must be one of [available, occupied, maintenance]',
    }),
  hotelId: Joi.number().integer().positive().optional().messages({
    'number.base': 'Hotel ID must be a valid number',
    'number.integer': 'Hotel ID must be an integer',
    'number.positive': 'Hotel ID must be a positive number',
  }),
});

export type updateRoomDto = {
  roomType?: RoomType;
  price?: number;
  status?: Satus;
  roomNumber?: number;
  hotelId: string;
};

export const getRoomValidation = Joi.object({
  id: Joi.number().integer().positive().required().messages({
    'number.base': 'ID must be a valid number',
    'number.integer': 'ID must be an integer',
    'number.positive': 'ID must be a positive number',
    'any.required': 'ID is a required field',
  }),
});

export const getHotelValidation = Joi.object({
  id: Joi.number()
    .integer() // Ensures the value is an integer
    .positive() // Ensures the value is positive
    .required()
    .messages({
      'number.base': 'ID must be a valid number',
      'number.integer': 'ID must be an integer',
      'number.positive': 'ID must be a positive number',
      'any.required': 'ID is a required field',
    }),
});

export const deleteRoomValidation = Joi.object({
  id: Joi.number().integer().positive().required().messages({
    'number.base': 'ID must be a valid number',
    'number.integer': 'ID must be an integer',
    'number.positive': 'ID must be a positive number',
    'any.required': 'ID is a required field',
  }),
});
