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
  getProfile,
} from "../service/userService.js";

import { getOne as getItem } from "../service/itemService.js";

import sendToken from "../utils/response-handlers/sendToken.js";
import User from "../model/userModel.js";
import crypto from "crypto";

export const CreateUser = async (req, res, next) => {
  let alreadyExists = await registerCheck(req.body.email);

  if (alreadyExists) {
    return next(new AppError("User already exists", BADREQUEST));
  }

  const { error } = validateCreateUser.validate(req.body);

  if (error) {
    console.log("invalid request " + error.message);
    return next(new AppError("Something went wrong", BADREQUEST));
  }

  let userData = req.body;
  const user = await add(userData);

  if (user) {
    return sendToken(res, user, "User created successfully", SUCCESS);
  } else {
    return next(new AppError("Something went wrong", BADREQUEST));
  }
};

export const loginUser = async (req, res, next) => {
  const { email, pswd } = req.body;

  if (_.isEmpty(email) || _.isEmpty(pswd)) {
    return next(new AppError("Email and Password are required", BADREQUEST));
  }

  const user = await loginCheck(email);

  if (!user) {
    return next(new AppError("Email or password is incorrect", BADREQUEST));
  }

  if (!(await user.isValidPassword(pswd))) {
    return next(new AppError("Invalid Email or Password", BADREQUEST));
  }

  sendToken(res, user, "User logged in successfully", SUCCESS);
};

export const updateUser = async (req, res, next) => {
  const { id } = req.params;
  if (_.isEmpty(id)) {
    return next(new AppError("User id is required", BADREQUEST));
  }

  const user = await update(id, req.body);
  if (user) {
    return next(new AppSuccess(user, "User Updated successfully", SUCCESS));
  } else {
    return next(new AppError("Something went wrong", BADREQUEST));
  }
};

export const getUsers = async (req, res, next) => {
  const users = await getAll();
  if (users) {
    return next(new AppSuccess(users, "Users successfully Send", SUCCESS));
  } else {
    return next(new AppError("Something went wrong", BADREQUEST));
  }
};

export const getUser = async (req, res, next) => {
  const { id } = req.params;
  if (_.isEmpty(id)) {
    return next(new AppError("User id is required", BADREQUEST));
  }
  const user = await getOne(id);

  if (user) {
    return next(new AppSuccess(user, "User successfully Send", SUCCESS));
  } else {
    return next(new AppError("Something went wrong", BADREQUEST));
  }
};
export const myProfile = async (req, res, next) => {
  try {
    if (req.user) {
      return res
        .status(200)
        .send(new AppSuccess(req.user, "User successfully sent here", 200));
    } else {
      return next(new AppError("User not found", 404));
    }
  } catch (error) {
    return next(new AppError("An error occurred while fetching the user", 500));
  }
};
export const deleteUser = async (req, res, next) => {
  const { id } = req.params;
  if (_.isEmpty(id)) {
    return next(new AppError("User id is required", BADREQUEST));
  }
  const user = await remove(id);

  if (user) {
    return next(new AppSuccess(user, "User Deleted successfully", SUCCESS));
  } else {
    return next(new AppError("Something went wrong", BADREQUEST));
  }
};

export const updateEmailOrPassword = async (req, res, next) => {
  try {
    const user = await getOneWP(req.user._id);
    const { type, email, pswd, newPassword, confirmPassword } = req.body;

    if (!user) {
      return next(new AppError("User Not exists", BADREQUEST));
    }

    if (type === "email") {
      let alreadyExists = await registerCheck(req.body.email);
      if (alreadyExists) {
        return next(new AppError("User Email already exists", BADREQUEST));
      }

      user.email = email;
      await user.save();
    }

    if (type === "password") {
      if (await user.isValidPassword(pswd)) {
        if (newPassword !== confirmPassword) {
          return next(
            new AppError(
              "Password and confirm password does not match",
              BADREQUEST
            )
          );
        }

        user.pswd = newPassword;
        await user.save();
      } else {
        return next(new AppError("Invalid Email or Password", BADREQUEST));
      }
    }

    if (user) {
      return next(new AppSuccess(user, "User Updated successfully", SUCCESS));
    } else {
      return next(new AppError("Something went wrong", BADREQUEST));
    }
  } catch (err) {
    return next(new AppError(err.message, BADREQUEST));
  }
};

export const forgotPassword = async (req, res, next) => {
  const { email } = req.body;
  if (_.isEmpty(email)) {
    return next(new AppError("Email is required", BADREQUEST));
  }
  const user = await getOneByEmail(email);

  if (!user) {
    return next(new AppError("Email not found", BADREQUEST));
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
    return next(new AppError(err.message, BADREQUEST));
  }

  // sendToken(res, resetUrl, "Password reset link sent to your email", SUCCESS);
};

export const resetPassword = async (req, res, next) => {
  if (_.isEmpty(req.params.token)) {
    return next(
      new AppError(
        "Password reset token is invalid or has been expired",
        BADREQUEST
      )
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
    return next(
      new AppError(
        "Password reset token is invalid or has been expired",
        BADREQUEST
      )
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(
      new AppError("Password and confirm password does not match", BADREQUEST)
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
      return next(new AppError("Product not found", NOTFOUND));
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
    return next(
      new AppSuccess(user, "Wish list updated successfully", SUCCESS)
    );
  } catch (err) {
    return next(new AppError(err.message, BADREQUEST));
  }
};
