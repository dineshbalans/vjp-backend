import Joi from "joi";

export const validateVerifyUser = Joi.object().keys({
  email: Joi.string().required(),
  pswd: Joi.string().required(),
  gstNum: Joi.string().required(),
  fName: Joi.string().required(),
  lName: Joi.string().required(),
  cmpny: Joi.string().required(),
  strtAddrss: Joi.string().required(),
  cntry: Joi.string().required(),
  state: Joi.string().required(),
  city: Joi.string().required(),
  zipCode: Joi.string().required(),
  phNum: Joi.string().required(),
});
