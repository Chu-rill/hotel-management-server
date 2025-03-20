import * as Joi from 'joi';

// signup validator schema
export const signup = Joi.object({
  firstName: Joi.string().required().messages({
    'string.base': 'firstName must be a string',
    'string.empty': 'firstName is required',
    'any.required': 'firstName is a required field',
  }),
  lastName: Joi.string().required().messages({
    'string.base': 'lastName must be a string',
    'string.empty': 'lastName is required',
    'any.required': 'lastName is a required field',
  }),
  password: Joi.string().required().min(6).messages({
    'string.base': 'Password must be a string',
    'string.empty': 'Password is required',
    'any.required': 'Password is a required field',
    'string.min': 'Password must be at least 6 characters long',
  }),
  email: Joi.string().email().required().messages({
    'string.base': 'Email must be a string',
    'string.empty': 'Email is required',
    'any.required': 'Email is a required field',
    'string.email': 'Email must be a valid email address',
  }),
  phone: Joi.string().optional().messages({
    'string.base': 'Phone Number must be a string',
  }),
  role: Joi.string().required().messages({
    'string.base': 'role Name must be a string',
    'string.empty': 'role Name is required',
    'any.required': 'role Name is a required field',
  }),
  hotelId: Joi.number().positive().optional().messages({
    'number.base': 'hotelId price must be a number',
    'number.positive': 'hotelId price must be a positive number',
  }),
});

// Login validator schema
export const login = Joi.object({
  email: Joi.string().email().required().messages({
    'string.base': 'Email must be a string',
    'string.empty': 'Email is required',
    'any.required': 'Email is a required field',
    'string.email': 'Email must be a valid email address',
  }),
  password: Joi.string().required().messages({
    'string.base': 'Password must be a string',
    'string.empty': 'Password is required',
    'any.required': 'Password is a required field',
  }),
});
