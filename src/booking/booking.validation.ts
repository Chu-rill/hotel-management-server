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
  customerId: Joi.number().integer().positive().required().messages({
    'number.base': 'Customer ID must be a valid number',
    'number.integer': 'Customer ID must be an integer',
    'number.positive': 'Customer ID must be a positive number',
    'any.required': 'Customer ID is a required field',
  }),
  roomId: Joi.number().integer().positive().required().messages({
    'number.base': 'Room ID must be a valid number',
    'number.integer': 'Room ID must be an integer',
    'number.positive': 'Room ID must be a positive number',
    'any.required': 'Room ID is a required field',
  }),
});

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
  customerId: Joi.number().integer().positive().optional().messages({
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
