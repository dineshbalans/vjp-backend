import _ from "lodash";
import { add, getAll, getOne, remove, update } from "../service/categotyService.js";
import AppSuccess from "../utils/response-handlers/app-success.js";
import { BADREQUEST, NOTFOUND, SUCCESS } from "../utils/constants/statusCode.js";
import AppError from "../utils/response-handlers/app-error.js";
import { validateCreateCategory } from "./../utils/validator/validateCategory.js";

export const CreateCategory = async (req, res, next) => {
  const { error } = validateCreateCategory.validate(req.body);

  if (error) {
    console.log("invalid request " + error.message);
    return AppError(res, "Something went wrong", BADREQUEST);
  }

  let categoryData = req.body;
  const category = await add(categoryData);

  if (category) {
    return AppSuccess(res, category, "Category created successfully", SUCCESS);
  } else {
    return AppError(res, "Something went wrong", BADREQUEST);
  }
};

export const updateCategory = async (req, res, next) => {
  const { id } = req.params;
  if (_.isEmpty(id)) {
    return AppError(res, "Category id is required", BADREQUEST);
  }

  const category = await update(id, req.body);
  if (category) {
    return AppSuccess(res, category, "Category Updated successfully", SUCCESS);
  } else {
    return AppError(res, "Something went wrong", BADREQUEST);
  }
};

export const getCategories = async (req, res, next) => {
  const categories = await getAll()
  if (categories) {
    return AppSuccess(res, categories, "Categories successfully Send", SUCCESS);
  } else {
    return AppError(res, "No categories found", NOTFOUND);
  }
};

export const getCategory = async (req, res, next) => {
  const { id } = req.params;
  if (_.isEmpty(id)) {
    return AppError(res, "Category id is required", BADREQUEST);
  }
  const category = await getOne(id);

  if (category) {
    return AppSuccess(res, category, "Category successfully Send", SUCCESS);
  } else {
    return AppError(res, "Something went wrong", BADREQUEST);
  }
};

export const deleteCategory = async (req, res, next) => {
  const { id } = req.params;
  if (_.isEmpty(id)) {
    return AppError(res, "Category id is required", BADREQUEST);
  }
  const category = await remove(id);

  if (category) {
    return AppSuccess(res, category, "Category Deleted successfully", SUCCESS);
  } else {
    return AppError(res, "Something went wrong", BADREQUEST);
  }
};


export const getCategorieswithSearch  = async (req, res, next) => {

  const categories = await getAll()
  
  const search = await getSearchinTotal(req)

  if (categories) {

    return AppSuccess(res, categories, "Categories successfully Send", SUCCESS);

  } else {

    return AppError(res, "No categories found", NOTFOUND);

  }
  
}