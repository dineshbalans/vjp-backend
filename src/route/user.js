import { Router } from "express";
import {
  CreateUser,
  deleteUser,
  forgotPassword,
  getUser,
  getUsers,
  loginUser,
  resetPassword,
  updateEmailOrPassword,
  updateUser,
  wishListAddOrRemove,
} from "../controller/userController.js";
import {
  isAuthenticatedAdminUser,
  isAuthenticatedUser,
} from "./../utils/middlewares/authenticate.js";

const router = Router();

// admin

router.route("/users").get(isAuthenticatedAdminUser, getUsers);
router.route("/user/:id").get(isAuthenticatedUser, getUser);
router.route("/user/delete/:id").delete(isAuthenticatedAdminUser, deleteUser);

// User Routes

router.route("/user/register").post(CreateUser);
router.route("/user/login").post(loginUser);
router.route("/user/update/:id").put(isAuthenticatedUser, updateUser);

router
  .route("/user/email-password/update")
  .put(isAuthenticatedUser, updateEmailOrPassword);

router.route("/user/password/forgot").post(forgotPassword);
router.route("/user/password/reset/:token").post(resetPassword);

router
  .route("/user/wishlist/:productId")
  .put(isAuthenticatedUser, wishListAddOrRemove);

 

// router.route("/user/update/:id").put(updateUser);

export default router;
