import jwt from "jsonwebtoken";
import { getOne } from "./../../service/userService.js";
import { BADREQUEST } from "./../constants/statusCode.js";
import AppError from "./../response-handlers/app-error.js";

export const isAuthenticatedUser = async (req, res, next) => {
  const { vjpuser } = req.cookies;

  console.log('token from middleware',vjpuser)
  if (!vjpuser) {
    return next(new AppError("Login first to access this resource", 400));
  }

  try {
    const decoded = jwt.verify(vjpuser, process.env.JWT_SECRET);

    if (!decoded.id) {
      return next(new AppError("Invalid token", 400));
    }

    console.log('decoded.id',typeof decoded.id)

    const user = await getOne(decoded.id);

    if (!user) {
      return next(new AppError("User not found", 404));
    }

    req.user = user;
    next();
  } catch (error) {
    return next(new AppError("Invalid or expired token", 400));
  }
};
// export const isAuthenticatedAdminUser = async (req, res, next) => {
//   const { at } = req.cookies;

//   console.log("coming here", at);

//   if (!at) {
//     return next(
//       new AppError("Login first to assess this resource", BADREQUEST)
//     );
//   }

//   console.log(at);
//   try {
//     const decoded = jwt.verify(at, process.env.JWT_SECRET);
//     // req.user = decoded;

//     console.log(decoded);
//     next();
//   } catch (error) {
//     return next(new AppError("Invalid or expired token", BADREQUEST));
//   }
// };

export const isAuthenticatedAdminUser = async (req, res, next) => {
  const { at } = req.cookies;

  // console.log("Checking authentication...");
  // console.log("Token:", at);

  if (!at) {
    console.log("No token found, redirecting to login");
    return next(
      new AppError("Login first to access this resource", BADREQUEST)
    );
  }

  try {
    const decoded = jwt.verify(at, process.env.JWT_SECRET);
    req.decoded = decoded;
    next();
  } catch (error) {
    console.error("Token verification failed:", error);
    return next(new AppError("Invalid or expired token", BADREQUEST));
  }
};

// export const authorizeRoles = (...roles) => {
//   return (req, res, next) => {
//     if (!roles.includes(req.user.role)) {
//       return next(
//         new AppError(
//           res,
//           `${req.user.role} are not authorized to perform this action`,
//           403
//         )
//       );
//     }
//     next();
//   };
// };
