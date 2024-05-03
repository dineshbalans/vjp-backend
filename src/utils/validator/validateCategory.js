import Joi from "joi";

export const validateCreateCategory = Joi.object().keys({
  title: Joi.string().required(),
  description: Joi.string().required(),
});
