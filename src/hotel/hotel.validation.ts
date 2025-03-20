import * as Joi from 'joi';

export const deleteHotelValidation = Joi.object({
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

export const createHotelValidation = Joi.object({
  name: Joi.string().required().messages({
    'string.base': 'Name must be a string',
    'string.empty': 'Name is required',
    'any.required': 'Name is a required field',
  }),
  address: Joi.string().required().messages({
    'string.base': 'address must be a string',
    'string.empty': 'address is required',
    'any.required': 'address is a required field',
  }),
  city: Joi.string().required().messages({
    'string.base': 'city must be a string',
    'string.empty': 'city is required',
    'any.required': 'city is a required field',
  }),
  country: Joi.string().required().messages({
    'string.base': 'country must be a string',
    'string.empty': 'country is required',
    'any.required': 'country is a required field',
  }),
  phone: Joi.string().required().messages({
    'string.base': 'phone must be a string',
    'string.empty': 'phone is required',
    'any.required': 'phone is a required field',
  }),
  email: Joi.string().required().messages({
    'string.base': 'email must be a string',
    'string.empty': 'email is required',
    'any.required': 'email is a required field',
  }),
});

export const updateHotelValidation = Joi.object({
  name: Joi.string().optional().messages({
    'string.base': 'Name must be a string',
  }),
  address: Joi.string().optional().messages({
    'string.base': 'address must be a string',
  }),
  city: Joi.string().optional().messages({
    'string.base': 'city must be a string',
  }),
  country: Joi.string().optional().messages({
    'string.base': 'country must be a string',
  }),
  phone: Joi.string().optional().messages({
    'string.base': 'phone must be a string',
  }),
  email: Joi.string().optional().messages({
    'string.base': 'email must be a string',
  }),
  description: Joi.string().optional().messages({
    'string.base': 'description must be a string',
  }),
  rating: Joi.number()
    .min(1) // Minimum rating value
    .max(5) // Maximum rating value
    .optional() // Since the field is nullable in the schema
    .messages({
      'number.base': 'Rating must be a valid number',
      'number.min': 'Rating must be at least 1',
      'number.max': 'Rating must be at most 5',
    }),
});
