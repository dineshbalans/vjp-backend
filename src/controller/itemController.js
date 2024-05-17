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

  let BASE_URL = `${req.protocol}://${req.get("host")}`;

  console.log(req.files)
  if (req?.files?.length > 0) {
    req.files.forEach((file) => {
      let url = `${BASE_URL}/uploads/item/${file.originalname}`;
      images.push(url);
    });
  }

 
 
  let data = req.body.subCategory.split("/");

  const category = await getCategory(data[0]);
  
  const subCategoryName = category.subCategorys.find(
    (subCategory) => subCategory._id.toString() === data[1]
  );
  

  let text =
    category.category.toLowerCase().trim().split(" ").join("-") +
    "/" +
    subCategoryName.name.toLowerCase().trim().split(" ").join("-");
 
  req.body.subCategory = text;

 

  req.body.itemImage = images;
  req.body.category = data[0];
 
  req.body.subCategoryId = data[1];

  // item.save

  const { error } = validateCreateItem.validate(req.body);

  if (error) {
    console.log("invalid request " + error);
    return next(new AppError("Something went wrong", BADREQUEST));
  }

  let itemData = req.body;
  const item = await add(itemData);

   
  category?.items?.push(item);
  await category?.save();

  if (item) {
    return next(new AppSuccess(item, "Item created successfully", SUCCESS));
  } else {
    return next(new AppError("Something went wrong", BADREQUEST));
  }
};

export const updateItem = async (req, res, next) => {
  const { id } = req.params;

  if (_.isEmpty(id)) {
    return next(new AppError("Item id is required", BADREQUEST));
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
    return next(new AppSuccess(category, "Item Updated successfully", SUCCESS));
  } else {
    return next(new AppError("Something went wrong", BADREQUEST));
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
    return next(
      new AppSuccess(
        { itemsCount: itemsCount, resPerPage: resPerPage, items: items },
        "Items successfully Send",
        SUCCESS
      )
    );
  } else {
    return next(new AppError("Something went wrong", BADREQUEST));
  }
};

export const getItem = async (req, res, next) => {
  const { id } = req.params;
  if (_.isEmpty(id)) {
    return next(new AppError("Item id is required", BADREQUEST));
  }
  const item = await getOne(id);

  if (item) {
    return next(new AppSuccess(item, "Item successfully Send", SUCCESS));
  } else {
    return next(new AppError("Something went wrong", BADREQUEST));
  }
};

export const deleteItem = async (req, res, next) => {
  const { id } = req.params;
  if (_.isEmpty(id)) {
    return next(new AppError("Item id is required", BADREQUEST));
  }
  const item = await remove(id);

  if (item) {
    return next(new AppSuccess(item, "Item Deleted successfully", SUCCESS));
  } else {
    return next(new AppError("Something went wrong", BADREQUEST));
  }
};
