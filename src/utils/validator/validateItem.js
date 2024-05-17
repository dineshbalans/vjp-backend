import Joi from "joi";

export const validateCreateItem = Joi.object().keys({
    category: Joi.string().optional(),
    itemTitle: Joi.string().required(),
    itemDescription: Joi.string().required(),
    images: Joi.array().optional(),
    subCategory: Joi.string().required(),
    actualPrice: Joi.number().required(),
    discountPercentage: Joi.number().required(),
    stock: Joi.number().required(),
    subCategoryId: Joi.string().optional(),
    // highlights: Joi.array().required(),
});
