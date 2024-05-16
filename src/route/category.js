import { Router } from "express";
import {
  CreateCategory,
  createSubCategory,
  deleteCategory,
  deleteSubCategory,
  getCategories,
  getCategoriesNames,
  getCategory,
  updateCategory,
  updateSubCategory,
} from "./../controller/categoryController.js";
import { isAuthenticatedAdminUser } from "../utils/middlewares/authenticate.js";

const router = Router();

// admin

router.route("/category/create").post(isAuthenticatedAdminUser, CreateCategory);
router
  .route("/categories/list")
  .get(isAuthenticatedAdminUser, getCategoriesNames);

router
  .route("/category/update/:id")
  .put(isAuthenticatedAdminUser, updateCategory);
router
  .route("/category/delete/:id")
  .delete(isAuthenticatedAdminUser, deleteCategory);
  router
  .route("/category/:categoryID/create")
  .put(isAuthenticatedAdminUser, createSubCategory);
router
  .route("/category/:categoryID/:subCategoryID/update")
  .put(isAuthenticatedAdminUser, updateSubCategory);
router
  .route("/category/:categoryID/:subCategoryID/delete")
  .delete(isAuthenticatedAdminUser, deleteSubCategory);
// common
router.route("/categories").get(getCategories);
router.route("/category/:id").get(getCategory);

export default router;
