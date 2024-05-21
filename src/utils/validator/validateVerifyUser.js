import Joi from "joi";

export const validateVerifyUser = Joi.object({
  email: Joi.string().required().messages({
    "any.required": "Email cannot be empty.",
    "string.empty": "Email cannot be empty.",
  }),
  pswd: Joi.string().required().messages({
    "any.required": "Password cannot be empty.",
    "string.empty": "Password cannot be empty.",
  }),
  gstNum: Joi.string().required().messages({
    "any.required": "GST number cannot be empty.",
    "string.empty": "GST number cannot be empty.",
  }),
  fName: Joi.string().required().messages({
    "any.required": "First name cannot be empty.",
    "string.empty": "First name cannot be empty.",
  }),
  lName: Joi.string().required().messages({
    "any.required": "Last name cannot be empty.",
    "string.empty": "Last name cannot be empty.",
  }),
  cmpny: Joi.string().required().messages({
    "any.required": "Company name cannot be empty.",
    "string.empty": "Company name cannot be empty.",
  }),
  strtAddrss: Joi.string().required().messages({
    "any.required": "Street address cannot be empty.",
    "string.empty": "Street address cannot be empty.",
  }),
  cntry: Joi.string().required().messages({
    "any.required": "Country cannot be empty.",
    "string.empty": "Country cannot be empty.",
  }),
  state: Joi.string().required().messages({
    "any.required": "State cannot be empty.",
    "string.empty": "State cannot be empty.",
  }),
  city: Joi.string().required().messages({
    "any.required": "City cannot be empty.",
    "string.empty": "City cannot be empty.",
  }),
  zipCode: Joi.string().required().messages({
    "any.required": "ZIP code cannot be empty.",
    "string.empty": "ZIP code cannot be empty.",
  }),
  phNum: Joi.string().trim().min(10).max(10).required().messages({
    "any.required": "Phone number cannot be empty.",
    "string.empty": "Phone number cannot be empty.",
    "string.min": "Phone number should have a minimum length of {10}.",
    "string.max": "Phone number should have a maximum length of {10}.",
    "string.base": "Phone number should be a type of 'text'.",
  }),
});

// 'string.base': "a" should be a type of 'text',
//       'string.empty': "a" cannot be an empty field,
//       'string.min': "a" should have a minimum length of {#limit},
//       'any.required': "a" is a required field
