import _ from "lodash";
import AppSuccess from "../utils/response-handlers/app-success.js";
import { BADREQUEST, SUCCESS } from "../utils/constants/statusCode.js";
import AppError from "../utils/response-handlers/app-error.js";
import { validateCreateItem } from "../utils/validator/validateItem.js";
import { add, getAll, getOne, remove, update } from "../service/itemService.js";
import Item from "../model/itemsModel.js";
import { getOne as getCategory } from "../service/categotyService.js";
import APIFeatures from "../utils/api/apiFeatures.js";

export const CreateItem = async (req, res, next) => {
  let images = [];

  if (req?.files?.length > 0) {
    req.files.forEach((file) => {
      let url = `${process.env.BACKEND_URL}/uploads/item/${file.originalname}`;
      images.push({ image: url });
    });
  }

  req.body.itemImage = images;

  const { error } = validateCreateItem.validate(req.body);

  if (error) {
    console.log("invalid request " + error.message);
    return AppError(res, "Something went wrong", BADREQUEST);
  }

  let itemData = req.body;
  const category = await getCategory(req.body.category);
  const item = await add(itemData);

  category[0].items.push(item);
  await category[0].save();

  if (item) {
    return AppSuccess(res, category, "Item created successfully", SUCCESS);
  } else {
    return AppError(res, "Something went wrong", BADREQUEST);
  }
};

export const updateItem = async (req, res, next) => {
  const { id } = req.params;

  if (_.isEmpty(id)) {
    return AppError(res, "Item id is required", BADREQUEST);
  }

  let images = [];

  if (req.body.imagesCleared === "false") {
    images = product.images;
  }

  if (req.files.length > 0) {
    req.files.forEach((file) => {
      let url = `${process.env.BACKEND_URL}/uploads/item/${file.originalname}`;
      images.push({ image: url });
    });
  }

  req.body.itemImage = images;

  const category = await update(id, req.body);
  if (category) {
    return AppSuccess(res, category, "Item Updated successfully", SUCCESS);
  } else {
    return AppError(res, "Something went wrong", BADREQUEST);
  }
};

// 
export const getItems = async (req, res, next) => {
  const resPerPage = 12;
  let buildQuery = () => {
    return new APIFeatures(Item.find(), req.query); //.search()
  };

  const filterdItemsCount = await buildQuery().query.countDocuments();

  const totalItemsCount = await Item.countDocuments({});

  let itemsCount = totalItemsCount;

  if (filterdItemsCount !== totalItemsCount) {
    itemsCount = filterdItemsCount;
  }

  const items = await buildQuery().paginate(resPerPage).query;

  // const items = await getAll();

  if (items) {
    return AppSuccess(
      res,
      { itemsCount: itemsCount, resPerPage: resPerPage, items: items },
      "Items successfully Send",
      SUCCESS
    );
  } else {
    return AppError(res, "Something went wrong", BADREQUEST);
  }
};



export const getItem = async (req, res, next) => {
  const { id } = req.params;
  if (_.isEmpty(id)) {
    return AppError(res, "Item id is required", BADREQUEST);
  }
  const item = await getOne(id);

  if (item) {
    return AppSuccess(res, item, "Item successfully Send", SUCCESS);
  } else {
    return AppError(res, "Something went wrong", BADREQUEST);
  }
};

export const deleteItem = async (req, res, next) => {
  const { id } = req.params;
  if (_.isEmpty(id)) {
    return AppError(res, "Item id is required", BADREQUEST);
  }
  const item = await remove(id);

  if (item) {
    return AppSuccess(res, item, "Item Deleted successfully", SUCCESS);
  } else {
    return AppError(res, "Something went wrong", BADREQUEST);
  }
};
