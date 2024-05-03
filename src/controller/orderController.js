import _ from "lodash";
import AppSuccess from "../utils/response-handlers/app-success.js";
import { BADREQUEST, SUCCESS } from "../utils/constants/statusCode.js";
import AppError from "../utils/response-handlers/app-error.js";
import { validateCreateOrder } from "./../utils/validator/validateOrder.js";
import { add, getAll, getOne, update } from "../service/orderService.js";

export const CreateOrder = async (req, res, next) => {
  const { error } = validateCreateOrder.validate(req.body);

  if (error) {
    console.log("invalid request " + error.message);
    return AppError(res, "Something went wrong", BADREQUEST);
  }

  let orderData = req.body;
  const order = await add(orderData);

  if (order) {
    return AppSuccess(res, order, "Order created successfully", SUCCESS);
  } else {
    return AppError(res, "Something went wrong", BADREQUEST);
  }
};

export const getOrder = async (req, res, next) => {
    const { id } = req.params;
    if (_.isEmpty(id)) {
      return AppError(res, "Order id is required", BADREQUEST);
    }
    const order = await getOne(id);
  
    if (order) {
      return AppSuccess(res, order, "Order successfully Send", SUCCESS);
    } else {
      return AppError(res, "Something went wrong", BADREQUEST);
    }
  };

//  Admin

export const updateOrder = async (req, res, next) => {
  const { id } = req.params;
  if (_.isEmpty(id)) {
    return AppError(res, "Order id is required", BADREQUEST);
  }

  const order = await update(id, req.body);
  if (order) {
    return AppSuccess(res, order, "Order Updated successfully", SUCCESS);
  } else {
    return AppError(res, "Something went wrong", BADREQUEST);
  }
};

export const getOrders = async (req, res, next) => {
  const orders = await getAll();
  if (orders) {
    return AppSuccess(res, orders, "orders data", SUCCESS);
  } else {
    return AppError(res, "Something went wrong", BADREQUEST);
  }
};


