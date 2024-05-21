import Joi from "joi";

export const validateVerifyUser = Joi.object({
  email: Joi.string().required().messages({
    "any.required": "Email is required.",
  }),
  pswd: Joi.string().required().messages({
    "any.required": "Password is required.",
  }),
  gstNum: Joi.string().required().messages({
    "any.required": "GST number is required.",
  }),
  fName: Joi.string().required().messages({
    "any.required": "First name is required.",
  }),
  lName: Joi.string().required().messages({
    "any.required": "Last name is required.",
  }),
  cmpny: Joi.string().required().messages({
    "any.required": "Company name is required.",
  }),
  strtAddrss: Joi.string().required().messages({
    "any.required": "Street address is required.",
  }),
  cntry: Joi.string().required().messages({
    "any.required": "Country is required.",
  }),
  state: Joi.string().required().messages({
    "any.required": "State is required.",
  }),
  city: Joi.string().required().messages({
    "any.required": "City is required.",
  }),
  zipCode: Joi.string().required().messages({
    "any.required": "ZIP code is required.",
  }),
  phNum: Joi.string().required().messages({
    "any.required": "Phone number is required.",
  }),
});
