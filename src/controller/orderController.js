import _ from "lodash";
import AppSuccess from "../utils/response-handlers/app-success.js";
import { BADREQUEST, SUCCESS } from "../utils/constants/statusCode.js";
import AppError from "../utils/response-handlers/app-error.js";
import { validateCreateOrder } from "./../utils/validator/validateOrder.js";
import {
  add,
  getAll,
  getMyAllOrders,
  getOne,
  update,
} from "../service/orderService.js";
import Order from "../model/orderModel.js";
import APIFeatures from "../utils/api/apiFeatures.js";

export const CreateOrder = async (req, res, next) => {
  const { error } = validateCreateOrder.validate(req.body);

  if (error) {
    console.log("invalid request " + error.message);
    return next(new AppError("Something went wrong", BADREQUEST));
  }

  let orderData = req.body;

  const order = await add(orderData);

  if (order) {
    return next(new AppSuccess(order, "Order created successfully", SUCCESS));
  } else {
    return next(new AppError("Something went wrong", BADREQUEST));
  }
};

export const getOrder = async (req, res, next) => {
  const { id } = req.params;
  if (_.isEmpty(id)) {
    return next(new AppError("Order id is required", BADREQUEST));
  }
  const order = await getOne(id);

  if (order) {
    return next(new AppSuccess(order, "Order successfully Send", SUCCESS));
  } else {
    return next(new AppError("Something went wrong", BADREQUEST));
  }
};

export const getMyOrders = async (req, res, next) => {
  const { id } = req.user;

  if (_.isEmpty(id)) {
    return next(new AppError("User id is required", BADREQUEST));
  }

  const orders = await getMyAllOrders(id);
  if (orders) {
    return next(new AppSuccess(orders, "orders data", SUCCESS));
  } else {
    return next(new AppError("Something went wrong", BADREQUEST));
  }
};

// Admin

export const updateOrder = async (req, res, next) => {
  const { id } = req.params;
  if (_.isEmpty(id)) {
    return next(new AppError("Order id is required", BADREQUEST));
  }

  const order = await update(id, req.body);
  if (order) {
    return next(new AppSuccess(order, "Order Updated successfully", SUCCESS));
  } else {
    return next(new AppError("Something went wrong", BADREQUEST));
  }
};

export const getOrders = async (req, res, next) => {
  const resPerPage = 12;

  let buildQuery = () => {
    return new APIFeatures(Order.find(), req.query).search().sortWithDate();
  };

  const filterdOrdersCount = await buildQuery().query.countDocuments();

  const totalOrdersCount = await Order.countDocuments({});

  let ordersCount = totalOrdersCount;

  if (filterdOrdersCount !== totalOrdersCount) {
    ordersCount = filterdOrdersCount;
  }

  const orders = await buildQuery().paginate(resPerPage).query;

  if (orders) {
    return next(
      new AppSuccess(
        { ordersCount: ordersCount, orders: orders },
        "Orders Data",
        SUCCESS
      )
    );
  } else {
    return next(new AppError("Something went wrong", BADREQUEST));
  }
};
