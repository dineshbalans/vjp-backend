import Joi from "joi";

export const validateUpdatePassAndEmail = Joi.object().keys({
  email: Joi.string().required().messages({
    "any.required": "Email cannot be empty.",
    "string.empty": "Email cannot be empty.",
  }),
  pswd: Joi.string().required().messages({
    "any.required": "Password cannot be empty.",
    "string.empty": "Password cannot be empty.",
  }),
  newPassword: Joi.string()
    .min(8)
    .max(16)
    .pattern(new RegExp("^(?=.*[0-9])(?=.*[!@#$%^&*])"))
    .required()
    .messages({
      "any.required": "Password cannot be empty.",
      "string.empty": "Password cannot be empty.",
      "string.min": "Password must be at least 8 characters long.",
      "string.max": "Password must be at most 16 characters long.",
      "string.pattern.base":
        "Password must contain at least one special character and one number.",
    }),
  confirmPassword: Joi.string().required().messages({
    "any.required": "Password cannot be empty.",
    "string.empty": "Password cannot be empty.",
  }),
});

export default validateUpdatePassAndEmail;
