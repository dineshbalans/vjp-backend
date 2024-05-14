import _ from "lodash";
import {
  add,
  getAll,
  getAllName,
  getOne,
  remove,
  update,
} from "../service/categotyService.js";
import AppSuccess from "../utils/response-handlers/app-success.js";
import {
  BADREQUEST,
  NOTFOUND,
  SUCCESS,
} from "../utils/constants/statusCode.js";
import AppError from "../utils/response-handlers/app-error.js";
import { validateCreateCategory } from "./../utils/validator/validateCategory.js";

export const CreateCategory = async (req, res, next) => {
  const { error } = validateCreateCategory.validate(req.body);

  if (error) {
    console.log("invalid request " + error.message);
    return next(new AppError("Something went wrong At Data", BADREQUEST));
  }

  let categoryData = req.body;
  const category = await add(categoryData);
  const categories = await getAll();

  if (category) {
    return next(
      new AppSuccess(
        { category, categories },
        "Category created successfully",
        SUCCESS
      )
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

export const deleteCategory = async (req, res, next) => {
  const { id } = req.params;
  if (_.isEmpty(id)) {
    return next(new AppError("Category id is required", BADREQUEST));
  }
  const category = await remove(id);

  if (category) {
    return next(
      new AppSuccess(category, "Category Deleted successfully", SUCCESS)
    );
  } else {
    return next(new AppError("Something went wrong", BADREQUEST));
  }
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

export const getCategoriesNames = async (req, res, next) => {
  const categories = await getAllName();
  if (categories) {
    return next(
      new AppSuccess(categories, "Categories successfully Send", SUCCESS)
    );
  } else {
    return next(new AppError("No categories found", NOTFOUND));
  }
};
