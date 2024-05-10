import _ from "lodash";
import AppSuccess from "../utils/response-handlers/app-success.js";
import { BADREQUEST, SUCCESS } from "../utils/constants/statusCode.js";
import AppError from "../utils/response-handlers/app-error.js";
import { validateCreateUser } from "./../utils/validator/validateUser.js";
import {
  add,
  getAll,
  getOne,
  getOneWP,
  loginCheck,
  getOneByEmail,
  registerCheck,
  remove,
  update,
} from "../service/userService.js";

import { getOne as getItem } from "../service/itemService.js";

import sendToken from "../utils/response-handlers/sendToken.js";
import User from "../model/userModel.js";
import crypto from "crypto";

export const CreateUser = async (req, res, next) => {
  let alreadyExists = await registerCheck(req.body.email);

  if (alreadyExists) {
    return AppError(res, "User already exists", BADREQUEST);
  }

  const { error } = validateCreateUser.validate(req.body);

  if (error) {
    console.log("invalid request " + error.message);
    return AppError(res, "Something went wrong", BADREQUEST);
  }

  let userData = req.body;
  const user = await add(userData);

  if (user) {
    return sendToken(res, user, "User created successfully", SUCCESS);
  } else {
    return AppError(res, "Something went wrong", BADREQUEST);
  }
};

export const loginUser = async (req, res, next) => {
  const { email, pswd } = req.body;

  if (_.isEmpty(email) || _.isEmpty(pswd)) {
    return AppError(res, "Email and Password are required", BADREQUEST);
  }

  const user = await loginCheck(email);

  if (!user) {
    return AppError(res, "Email or password is incorrect", BADREQUEST);
  }

  if (!(await user.isValidPassword(pswd))) {
    return AppError(res, "Invalid Email or Password", BADREQUEST);
  }

  sendToken(res, user, "User logged in successfully", SUCCESS);
};

export const updateUser = async (req, res, next) => {
  const { id } = req.params;
  if (_.isEmpty(id)) {
    return AppError(res, "User id is required", BADREQUEST);
  }

  const user = await update(id, req.body);
  if (user) {
    return AppSuccess(res, user, "User Updated successfully", SUCCESS);
  } else {
    return AppError(res, "Something went wrong", BADREQUEST);
  }
};

export const getUsers = async (req, res, next) => {
  const users = await getAll();
  if (users) {
    return AppSuccess(res, users, "Users successfully Send", SUCCESS);
  } else {
    return AppError(res, "Something went wrong", BADREQUEST);
  }
};

export const getUser = async (req, res, next) => {
  const { id } = req.params;
  if (_.isEmpty(id)) {
    return AppError(res, "User id is required", BADREQUEST);
  }
  const user = await getOne(id);

  if (user) {
    return AppSuccess(res, user, "User successfully Send", SUCCESS);
  } else {
    return AppError(res, "Something went wrong", BADREQUEST);
  }
};

export const deleteUser = async (req, res, next) => {
  const { id } = req.params;
  if (_.isEmpty(id)) {
    return AppError(res, "User id is required", BADREQUEST);
  }
  const user = await remove(id);

  if (user) {
    return AppSuccess(res, user, "User Deleted successfully", SUCCESS);
  } else {
    return AppError(res, "Something went wrong", BADREQUEST);
  }
};

export const updateEmailOrPassword = async (req, res, next) => {
  try {
    const user = await getOneWP(req.user._id);
    const { type, email, pswd, newPassword, confirmPassword } = req.body;

    if (!user) {
      return AppError(res, "User Not exists", BADREQUEST);
    }

    if (type === "email") {
      let alreadyExists = await registerCheck(req.body.email);
      if (alreadyExists) {
        return AppError(res, "User Email already exists", BADREQUEST);
      }

      user.email = email;
      await user.save();
    }

    if (type === "password") {
      if (await user.isValidPassword(pswd)) {
        if (newPassword !== confirmPassword) {
          return AppError(
            res,
            "Password and confirm password does not match",
            BADREQUEST
          );
        }

        user.pswd = newPassword;
        await user.save();
      } else {
        return AppError(res, "Invalid Email or Password", BADREQUEST);
      }
    }

    if (user) {
      return AppSuccess(res, user, "User Updated successfully", SUCCESS);
    } else {
      return AppError(res, "Something went wrong", BADREQUEST);
    }
  } catch (err) {
    return AppError(res, err.message, BADREQUEST);
  }
};

export const forgotPassword = async (req, res, next) => {
  const { email } = req.body;
  if (_.isEmpty(email)) {
    return AppError(res, "Email is required", BADREQUEST);
  }
  const user = await getOneByEmail(email);

  if (!user) {
    return AppError(res, "Email not found", BADREQUEST);
  }

  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });

  let BASE_URL = `${req.protocol}://${req.get("host")}`;

  const resetUrl = `${BASE_URL}/user/password/reset/${resetToken}`;

  try {
    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} Successfully`,
      resetUrl: resetUrl,
    });
  } catch (err) {
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return AppError(res, err.message, BADREQUEST);
  }

  // sendToken(res, resetUrl, "Password reset link sent to your email", SUCCESS);
};

export const resetPassword = async (req, res, next) => {
  if (_.isEmpty(req.params.token)) {
    return AppError(
      res,
      "Password reset token is invalid or has been expired",
      BADREQUEST
    );
  }
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordTokenExpire: { $gt: Date.now() },
  });

  if (!user) {
    return AppError(
      res,
      "Password reset token is invalid or has been expired",
      BADREQUEST
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return AppError(
      res,
      "Password and confirm password does not match",
      BADREQUEST
    );
  }

  user.pswd = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordTokenExpire = undefined;
  await user.save({ validateBeforeSave: false });

  sendToken(res, user, "Password reset successfully", SUCCESS);
};

export const wishListAddOrRemove = async (req, res, next) => {
  try {
    const user = await getOne(req.user._id);
    const { productId } = req.params;

    const product = await getItem(productId);

    if (!product) {
      return AppError(res, "Product not found", NOTFOUND);
    }

    let alreadyIn = false;

    for (let i = 0; i < user.wishList.length; i++) {
      if (user?.wishList[i]?._id == productId) {
        alreadyIn = true;
        break;
      }
    }

    if (alreadyIn) {
      user.wishList = user.wishList.filter((wish) => wish.id !== productId);
    } else {
      user.wishList.push(productId);
    }

    await user.save();
    return AppSuccess(res, user, "Wish list updated successfully", SUCCESS);
  } catch (err) {
    return AppError(res, err.message, BADREQUEST);
  }
};
