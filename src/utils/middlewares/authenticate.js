import jwt from "jsonwebtoken";
import { getOne } from "./../../service/userService.js";
import { BADREQUEST } from "./../constants/statusCode.js";
import AppError from "./../response-handlers/app-error.js";

export const isAuthenticatedUser = async (req, res, next) => {
  const { token } = req.cookies;
  console.log("user");

  if (!token) {
    return next(
      new AppError("Login first to assess this resource", BADREQUEST)
    );
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await getOne(decoded.id);

    next();
  } catch (error) {
    return AppError("Invalid or expired token", BADREQUEST);
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

  // if (!at) {
  //   console.log("No token found, redirecting to login");
  //   return next(
  //     new AppError("Login first to access this resource", BADREQUEST)
  //   );
  // }

  try {
    const decoded = jwt.verify(at, process.env.JWT_SECRET);

    next();
  } catch (error) {
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
