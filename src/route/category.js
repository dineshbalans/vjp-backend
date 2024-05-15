import { Router } from "express";
import {
  CreateCategory,
  deleteCategory,
  getCategories,
  getCategoriesNames,
  getCategory,
  updateCategory,
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

// common
router.route("/categories").get(getCategories);
router.route("/category/:id").get(getCategory);

export default router;
