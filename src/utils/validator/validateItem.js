import Joi from "joi";

export const validateCreateItem = Joi.object().keys({
    category: Joi.string().required(),
    itemTitle: Joi.string().required(),
    itemDescription: Joi.string().required(),
    itemImage: Joi.array().required(),
    subCategory: Joi.string().required(),
    actualPrice: Joi.number().required(),
    discountPercentage: Joi.number().required(),
    // subCategoryId: Joi.string().required(),
    // highlights: Joi.array().required(),
});
