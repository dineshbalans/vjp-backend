import Joi from "joi";

export const validateCreateOrder = Joi.object().keys({
  total: Joi.number().required(),
});
