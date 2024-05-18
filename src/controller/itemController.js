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

  console.log(req.files);
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

  req.body.images = images;
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
    return next(new AppError("Item id is required", 400));
  }

  const oldItem = await Item.findById(id);
  if (!oldItem) {
    return next(new AppError("Item not found", 404));
  }

  let images = [];

  // // If imagesCleared is false, keep the old images
  // if (req.body.imagesCleared === "false") {
  //   images = oldItem.images;
  // } else if (req.body.images && Array.isArray(req.body.images)) {
  //   // If the user has provided a list of remaining images
  //   images = req.body.images;
  // }

  if (req?.body?.existingImages?.length > 0) {
    req.body.existingImages.forEach((image) => {
      images.push(image);
    });
  }

  let BASE_URL = `${req.protocol}://${req.get("host")}`;

  // Add new images if there are any
  if (req?.files?.length > 0) {
    req.files.forEach((file) => {
      let url = `${BASE_URL}/uploads/item/${file.originalname}`;
      images.push(url);  
    });
  }

  if (req.body.subCategory) {
    let data = req.body.subCategory.split("/");
    if (data[0] !== oldItem.category.toString()) {
      // Remove item from old category's items

      console.log(data[0], oldItem.category);
      const oldCategory = await getCategory(oldItem.category);
      if (oldCategory) {
        oldCategory.items = oldCategory.items.filter(
          (item) => item.toString() !== id
        );
        await oldCategory.save();
      }

      // Add item to new category's items
      const newCategory = await getCategory(data[0]);
      if (!newCategory) {
        return next(new AppError("New category not found", 404));
      }
      newCategory.items.push(id);
      await newCategory.save();

      const subCategoryName = newCategory.subCategorys.find(
        (subCategory) => subCategory._id.toString() === data[1]
      );

      if (!subCategoryName) {
        return next(new AppError("Subcategory not found in new category", 404));
      }

      let text = `${newCategory.category
        .toLowerCase()
        .trim()
        .split(" ")
        .join("-")}/${subCategoryName.name
        .toLowerCase()
        .trim()
        .split(" ")
        .join("-")}`;
      req.body.subCategory = text;
      req.body.category = newCategory._id;
      req.body.subCategoryId = data[1];
    } else {
      const currentCategory = await getCategory(data[0]);
      const subCategoryName = currentCategory.subCategorys.find(
        (subCategory) => subCategory._id.toString() === data[1]
      );

      if (!subCategoryName) {
        return next(new AppError("Subcategory not found", 404));
      }

      let text = `${currentCategory.category
        .toLowerCase()
        .trim()
        .split(" ")
        .join("-")}/${subCategoryName.name
        .toLowerCase()
        .trim()
        .split(" ")
        .join("-")}`;
      req.body.subCategory = text;
      req.body.category = data[0];
      req.body.subCategoryId = data[1];
    }
  }

  req.body.images = images;

  const item = await Item.findByIdAndUpdate(id, req.body, { new: true });
  if (item) {
    return next(new AppSuccess(item, "Item Updated successfully", 200));
  } else {
    return next(new AppError("Something went wrong", 400));
  }
};
// export const updateItem = async (req, res, next) => {
//   const { id } = req.params;

//   if (_.isEmpty(id)) {
//     return next(new AppError("Item id is required", 400));
//   }

//   const oldItem = await getOne(id);
//   if (!oldItem) {
//     return next(new AppError("Item not found", 404));
//   }

//   let images = [];
//   if (req.body.imagesCleared === "false") {
//     images = oldItem.images;
//   }

//   let BASE_URL = `${req.protocol}://${req.get("host")}`;

//   if (req?.files?.length > 0) {
//     req.files.forEach((file) => {
//       let url = `${BASE_URL}/uploads/item/${file.originalname}`;
//       images.push(url); // Directly push the URL string
//     });
//   }

//   if (req.body.subCategory) {
//     let data = req.body.subCategory.split("/");
//     if (data[0] !== String(oldItem.category._id)) {
//       // Remove item from old category's items
//       const oldCategory = await getCategory(oldItem.category._id);
//       if (oldCategory) {
//         oldCategory.items = oldCategory.items.filter(
//           (item) => item.toString() !== id
//         );
//         await oldCategory.save();
//       }

//       // Add item to new category's items
//       const newCategory = await getCategory(data[0]);
//       if (!newCategory) {
//         return next(new AppError("New category not found", 404));
//       }
//       newCategory.items.push(id);
//       await newCategory.save();

//       const subCategoryName = newCategory.subCategorys.find(
//         (subCategory) => subCategory._id.toString() === data[1]
//       );

//       if (!subCategoryName) {
//         return next(new AppError("Subcategory not found in new category", 404));
//       }

//       let text = `${newCategory.category
//         .toLowerCase()
//         .trim()
//         .split(" ")
//         .join("-")}/${subCategoryName.name
//         .toLowerCase()
//         .trim()
//         .split(" ")
//         .join("-")}`;
//       req.body.subCategory = text;
//       req.body.category = newCategory._id;
//       req.body.subCategoryId = data[1];
//     } else {
//       const currentCategory = await getCategory(data[0]);
//       const subCategoryName = currentCategory.subCategorys.find(
//         (subCategory) => subCategory._id.toString() === data[1]
//       );

//       if (!subCategoryName) {
//         return next(new AppError("Subcategory not found", 404));
//       }

//       let text = `${currentCategory.category
//         .toLowerCase()
//         .trim()
//         .split(" ")
//         .join("-")}/${subCategoryName.name
//         .toLowerCase()
//         .trim()
//         .split(" ")
//         .join("-")}`;
//       req.body.subCategory = text;
//       req.body.category = data[0];
//       req.body.subCategoryId = data[1];
//     }
//   }

//   req.body.images = images;

//   const item = await Item.findByIdAndUpdate(id, req.body, { new: true });
//   if (item) {
//     return next(new AppSuccess(item, "Item Updated successfully", 200));
//   } else {
//     return next(new AppError("Something went wrong", 400));
//   }
// };

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

// export const deleteItem = async (req, res, next) => {
//   const { id } = req.params;
//   if (_.isEmpty(id)) {
//     return next(new AppError("Item id is required", BADREQUEST));
//   }
//   const item = await remove(id);

//   if (item) {
//     return next(new AppSuccess(item, "Item Deleted successfully", SUCCESS));
//   } else {
//     return next(new AppError("Something went wrong", BADREQUEST));
//   }
// };

export const deleteItem = async (req, res, next) => {
  const { id } = req.params;
  
  if (_.isEmpty(id)) {
    return next(new AppError("Item id is required", 400));
  }

  // Fetch the item to get the associated category
  const item = await Item.findById(id);
  if (!item) {
    return next(new AppError("Item not found", 404));
  }

  // Remove the item
  const deletedItem = await Item.findByIdAndDelete(id);
  if (!deletedItem) {
    return next(new AppError("Something went wrong", 400));
  }

  // Remove the item reference from the category
  if (item.category) {
    const category = await getCategory(item.category);
    if (category) {
      category.items = category.items.filter(itemId => itemId.toString() !== id);
      await category.save();
    }
  }

  return next(new AppSuccess(deletedItem, "Item Deleted successfully", 200));
};
