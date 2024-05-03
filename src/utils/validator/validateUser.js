import Joi from "joi";

export const validateCreateUser = Joi.object().keys({
  email: Joi.string().email().required(),
  pswd: Joi.string().required(),
  fName: Joi.string().required(),
  lName: Joi.string().required(),
});
