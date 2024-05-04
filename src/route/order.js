import { Router } from "express";
import {
  CreateOrder,
  getOrder,
  getOrders,
  updateOrder,
} from "../controller/orderController.js";

const router = Router();


router.route("/order/update/:id").put(updateOrder);
router.route("/orders").get(getOrders);

// user
router.route("/order/create").post(CreateOrder);

router.route("/order/:id").get(getOrder);

export default router;
