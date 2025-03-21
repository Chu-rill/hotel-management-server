import * as Joi from 'joi';

export const createReviewValidation = Joi.object({
  rating: Joi.number().min(1).max(5).required().messages({
    'number.base': 'Rating must be a valid number',
    'number.min': 'Rating must be at least 1',
    'number.max': 'Rating must be at most 5',
    'any.required': 'Rating is a required field',
  }),
  comment: Joi.string().optional().allow(null, '').messages({
    'string.base': 'Comment must be a string',
  }),
  customerId: Joi.number().integer().positive().required().messages({
    'number.base': 'Customer ID must be a valid number',
    'number.integer': 'Customer ID must be an integer',
    'number.positive': 'Customer ID must be a positive number',
    'any.required': 'Customer ID is a required field',
  }),
  hotelId: Joi.number().integer().positive().required().messages({
    'number.base': 'Hotel ID must be a valid number',
    'number.integer': 'Hotel ID must be an integer',
    'number.positive': 'Hotel ID must be a positive number',
    'any.required': 'Hotel ID is a required field',
  }),
});

export const updateReviewValidation = Joi.object({
  rating: Joi.number().min(1).max(5).optional().messages({
    'number.base': 'Rating must be a valid number',
    'number.min': 'Rating must be at least 1',
    'number.max': 'Rating must be at most 5',
  }),
  comment: Joi.string().optional().allow(null, '').messages({
    'string.base': 'Comment must be a string',
  }),
});

export const getReviewValidation = Joi.object({
  id: Joi.number().integer().positive().required().messages({
    'number.base': 'ID must be a valid number',
    'number.integer': 'ID must be an integer',
    'number.positive': 'ID must be a positive number',
    'any.required': 'ID is a required field',
  }),
});

export const getReviewValidationHotel = Joi.object({
  hotelId: Joi.number().integer().positive().required().messages({
    'number.base': 'hotelId must be a valid number',
    'number.integer': 'hotelId must be an integer',
    'number.positive': 'hotelId must be a positive number',
    'any.required': 'hotelId is a required field',
  }),
});

export const deleteReviewValidation = Joi.object({
  id: Joi.number().integer().positive().required().messages({
    'number.base': 'ID must be a valid number',
    'number.integer': 'ID must be an integer',
    'number.positive': 'ID must be a positive number',
    'any.required': 'ID is a required field',
  }),
});
