import * as Joi from 'joi';

// deleteUserValidation validator schema
export const deleteUserValidation = Joi.object({
  id: Joi.string()
    .pattern(/^c[a-z0-9]{24}$/) // Matches CUID format
    .required()
    .messages({
      'string.pattern.base': 'ID must be a valid CUID',
      'string.empty': 'ID is required',
      'any.required': 'ID is a required field',
    }),
});

export const getUserValidation = Joi.object({
  id: Joi.string()
    .pattern(/^c[a-z0-9]{24}$/) // Matches CUID format
    .required()
    .messages({
      'string.pattern.base': 'ID must be a valid CUID',
      'string.empty': 'ID is required',
      'any.required': 'ID is a required field',
    }),
});
// uploadProfile validator schema
export const uploadProfile = Joi.object({
  profile: Joi.string().required().messages({
    'string.base': 'profile must be a string',
    'string.empty': 'profile is required',
    'any.required': 'profile is a required field',
  }),
});

// updateUserValidation validator schema
export const updateUserValidation = Joi.object({
  firstName: Joi.string().optional().messages({
    'string.base': 'firstName must be a string',
  }),
  lastName: Joi.string().optional().messages({
    'string.base': 'lastName must be a string',
  }),
  email: Joi.string().email().optional().messages({
    'string.base': 'Email must be a string',
    'string.email': 'Email must be a valid email address',
  }),
  password: Joi.date().optional().messages({
    'date.base': 'password must be a valid date',
  }),
  phone: Joi.string().optional().messages({
    'string.base': 'Phone Number must be a string',
  }),
});
