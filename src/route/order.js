import { Router } from "express";
import {
  CreateOrder,
  getMyOrders,
  getOrder,
  getOrders,
  updateOrder,
} from "../controller/orderController.js";
import {
  isAuthenticatedAdminUser,
  isAuthenticatedUser,
} from "./../utils/middlewares/authenticate.js";

const router = Router();

// admin

router.route("/order/update/:id").put(isAuthenticatedAdminUser, updateOrder);
router.route("/orders").get(isAuthenticatedAdminUser, getOrders);
router.route("/order/:id/admin").get(isAuthenticatedAdminUser, getOrder);

 

// user
router.route("/order/:id").get(isAuthenticatedUser, getOrder);

router.route("/order/create").post(isAuthenticatedUser, CreateOrder);
router.route("/orders/my").get(isAuthenticatedUser, getMyOrders);

export default router;
