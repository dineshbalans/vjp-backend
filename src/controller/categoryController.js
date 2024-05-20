import _ from "lodash";
import {
  add,
  createSub,
  getAll,
 
  getOne,
  remove,
  removeSub,
  update,
  updateSub,
} from "../service/categotyService.js";
import AppSuccess from "../utils/response-handlers/app-success.js";
import {
  BADREQUEST,
  NOTFOUND,
  SUCCESS,
} from "../utils/constants/statusCode.js";
import AppError from "../utils/response-handlers/app-error.js";
import { validateCreateCategory } from "./../utils/validator/validateCategory.js";
import Item from "../model/itemsModel.js";

export const CreateCategory = async (req, res, next) => {
  const { error } = validateCreateCategory.validate(req.body);

  if (error) {
    console.log("invalid request " + error.message);
    return next(new AppError("Something went wrong At Data", BADREQUEST));
  }

  let categoryName = req.body.title.toLowerCase().trim().split(" ").join("-");
  req.body.category = categoryName;
  let categoryData = req.body;

  const category = await add(categoryData);
  const categories = await getAll();

  if (category) {
    return next(
      new AppSuccess(category, "Category created successfully", SUCCESS)
    );
  } else {
    return next(new AppError("Something went wrong", BADREQUEST));
  }
};

export const updateCategory = async (req, res, next) => {
  const { id } = req.params;
  if (_.isEmpty(id)) {
    return next(new AppError("Category id is required", BADREQUEST));
  }

  const category = await update(id, req.body);
  if (category) {
    return next(
      new AppSuccess(category, "Category Updated successfully", SUCCESS)
    );
  } else {
    return next(new AppError("Something went wrong", BADREQUEST));
  }
};

export const getCategories = async (req, res, next) => {
  const categories = await getAll();
  if (categories) {
    return next(
      new AppSuccess(categories, "Categories successfully Send", SUCCESS)
    );
  } else {
    return next(new AppError("No categories found", NOTFOUND));
  }
};

export const getCategory = async (req, res, next) => {
  const { id } = req.params;
  if (_.isEmpty(id)) {
    return next(new AppError("Category id is required", BADREQUEST));
  }
  const category = await getOne(id);

  if (category) {
    return next(
      new AppSuccess(category, "Category successfully Send", SUCCESS)
    );
  } else {
    return next(new AppError("Something went wrong", BADREQUEST));
  }
};

// export const deleteCategory = async (req, res, next) => {
//   const { id } = req.params;
//   if (_.isEmpty(id)) {
//     return next(new AppError("Category id is required", BADREQUEST));
//   }
//   const category = await remove(id);

//   if (category) {
//     return next(
//       new AppSuccess(category, "Category Deleted successfully", SUCCESS)
//     );
//   } else {
//     return next(new AppError("Something went wrong", BADREQUEST));
//   }
// };

export const deleteCategory = async (req, res, next) => {
  const { id } = req.params;

  if (_.isEmpty(id)) {
    return next(new AppError("Category id is required", 400));
  }

  const category = await getOne(id);
  if (!category) {
    return next(new AppError("Category not found", 404));
  }

  // Delete all items under this category
  const items = await Item.find({ category: id });
  for (let item of items) {
    await Item.findByIdAndDelete(item._id);
  }

  // Delete the category
  await remove(id);

  return next(new AppSuccess(category, "Category and its items deleted successfully", 200));
};

export const getCategorieswithSearch = async (req, res, next) => {
  const categories = await getAll();

  const search = await getSearchinTotal(req);

  if (categories) {
    return next(
      new AppSuccess(categories, "Categories successfully Send", SUCCESS)
    );
  } else {
    return next(new AppError("No categories found", NOTFOUND));
  }
};

 
export const createSubCategory = async (req, res, next) => {
  const { categoryID } = req.params;
  const { name } = req.body;

  const category = await getOne(categoryID);
  if (!category) {
    return next(new AppError("Category not found", NOTFOUND));
  }

  let alreadyExists = false;

  category.subCategorys.forEach((item) => {
    if (item.name === name) {
      alreadyExists = true;
      return next(new AppError("Sub Category already exists", BADREQUEST));
    }
  });

  if (!alreadyExists) {
    const updatedOne = await createSub(categoryID, name);

    if (updatedOne) {
      return next(
        new AppSuccess(updatedOne, "Sub Category created successfully", SUCCESS)
      );
    } else {
      return next(new AppError("Failed to create subcategory", BADREQUEST));
    }
  }
};

export const updateSubCategory = async (req, res, next) => {
  const { categoryID, subCategoryID } = req.params;
  const { name } = req.body;
  const updatedOne = await updateSub(categoryID, subCategoryID, name);

  if (updatedOne) {
    return next(
      new AppSuccess(
        updatedOne,
        "Sub Category Updated successfully Send",
        SUCCESS
      )
    );
  } else {
    return next(new AppError("No Sub category found", NOTFOUND));
  }
};

// export const deleteSubCategory = async (req, res, next) => {
//   const { categoryID, subCategoryID } = req.params;

//   const updatedOne = await removeSub(categoryID, subCategoryID);

//   if (updatedOne) {
//     return next(
//       new AppSuccess(updatedOne, "Sub Category removed successfully", SUCCESS)
//     );
//   } else {
//     return next(new AppError("No Sub category found", NOTFOUND));
//   }
// };


export const deleteSubCategory = async (req, res, next) => {
  const { categoryID, subCategoryID } = req.params;

  if (_.isEmpty(categoryID) || _.isEmpty(subCategoryID)) {
    return next(new AppError("Category ID and Subcategory ID are required", 400));
  }

  const category = await getOne(categoryID);
  if (!category) {
    return next(new AppError("Category not found", 404));
  }

  const subCategoryIndex = category.subCategorys.findIndex(sub => sub._id.toString() === subCategoryID);
  if (subCategoryIndex === -1) {
    return next(new AppError("Subcategory not found in the specified category", 404));
  }

  // Remove items associated with this subcategory
  const items = await Item.find({ subCategoryId: subCategoryID });
  for (let item of items) {
    await Item.findByIdAndDelete(item._id);
  }

  // Remove the subcategory from the category
  // category.subCategorys.splice(subCategoryIndex, 1);
  // await category.save();

  const updatedOne = await removeSub(categoryID, subCategoryID);


  return next(new AppSuccess(updatedOne, "Subcategory and its items removed successfully", 200));
};