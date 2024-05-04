import { getAll as getAllCategories } from "../service/categotyService.js";
import { getAll as getItems } from "../service/itemService.js";
import { getAll as getAllUsers } from "../service/userService.js";
import { BADREQUEST, SUCCESS } from "../utils/constants/statusCode.js";
import AppError from "../utils/response-handlers/app-error.js";
import Apadminuccess from "../utils/response-handlers/app-success.js";
import _ from "lodash";
import jwt from "jsonwebtoken";
import AppSuccess from "./../utils/response-handlers/app-success.js";
export const getDashboard = async (req, res, next) => {
  try {
    const categories = await getAllCategories();
    const items = await getItems();
    const users = await getAllUsers();

    return AppSuccess(
      res,
      {
        categoriesCount: categories.length,
        itemsCount: items.length,
        usersCount: users.length,
      },
      "Dashboard Data successfully Send",
      SUCCESS
    );
  } catch (err) {
    return AppError(res, "Something went wrong", BADREQUEST);
  }
};

export const getDashboardDetails = async (req, res, next) => {
  try {
    const categories = await getAllCategories();

    return AppSuccess(
      res,
      {
        categoriesCount: categories.length,
        categories: categories,
      },
      "Dashboard Data successfully Send",
      SUCCESS
    );
  } catch (err) {
    return AppError(res, "Something went wrong", BADREQUEST);
  }
};

// Auth

export const loginAdmin = async (req, res, next) => {
  const { username, password } = req.body;

  if (_.isEmpty(username) || _.isEmpty(password)) {
    return AppError(res, "Username and Password are required", BADREQUEST);
  }

  if (username === process.env.USERID && password === process.env.PASSWORD) {
    const token = jwt.sign({ username }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_TIME,
    });

    const options = {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    };

    res.status(200).cookie("at", token, options).json({
      success: true,
      at: token,
      user: true,
    });
  } else {
    return AppError(res, "Something went wrong", BADREQUEST);
  }
};

export const getAdminProfile = async (req, res, next) => {
  const { at } = req.cookies;

  if (!at) {
    return AppError(res, "Login first to assess this resource", BADREQUEST);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    res.status(200).json({
      success: true,
      user: true,
    });
  } catch (error) {
    return AppError(res, "Invalid or expired token", BADREQUEST);
  }
};

export const logoutAdmin = async (req, res, next) => {
  res.cookie("at", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  return AppSuccess(res, { user: false }, "Logout successfully", SUCCESS);
};
