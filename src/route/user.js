import { Router } from "express";
import {
  CreateUser,
  deleteUser,
  getUser,
  getUsers,
  loginUser,
  updateUser,
} from "../controller/userController.js";

const router = Router();

router.route("/users").get(getUsers);
router.route("/user/:id").get(getUser);
router.route("/user/delete/:id").delete(deleteUser);

//  User Routes
router.route("/user/register").post(CreateUser);
router.route("/user/login").post(loginUser);
router.route("/user/update/:id").put(updateUser);
router.route("/user/update/:id").put(updateUser);

export default router;
