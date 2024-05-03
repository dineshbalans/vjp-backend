import { Router } from "express";
import {
  CreateCategory,
  deleteCategory,
  getCategories,
  getCategory,
  updateCategory,
} from "./../controller/categoryController.js";
 
const router = Router();





router.route("/category/create").post(CreateCategory);
router.route("/category/update/:id").put(updateCategory);
router.route("/categories").get(getCategories);
router.route("/category/:id").get(getCategory);
router.route("/category/delete/:id").delete(deleteCategory);

export default router;
