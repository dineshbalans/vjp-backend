import jwt from "jsonwebtoken";
import { getOne } from "./../../service/userService.js";
import { BADREQUEST } from "./../constants/statusCode.js";
import AppError from "./../response-handlers/app-error.js";

export const isAuthenticatedUser = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return AppError(res, "Login first to assess this resource", BADREQUEST);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await getOne(decoded.id);

    next();
  } catch (error) {
    return AppError(res, "Invalid or expired token", BADREQUEST);
  }
};

export const isAuthenticatedAdminUser = async (req, res, next) => {
  const { at } = req.cookies;

  if (!at) {
    return AppError(res, "Login first to assess this resource", BADREQUEST);
  }

  try {
    const decoded = jwt.verify(at, process.env.JWT_SECRET);
    // req.user = decoded;

    next();
  } catch (error) {
    return AppError(res, "Invalid or expired token", BADREQUEST);
  }
};

export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError(
          res,
          `${req.user.role} are not authorized to perform this action`,
          403
        )
      );
    }
    next();
  };
};
