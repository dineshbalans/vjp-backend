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
  registerCheck,
  remove,
  update,
} from "../service/userService.js";
import sendToken from "../utils/response-handlers/sendToken.js";
 
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

export const loginUser = async (req, res, exit) => {
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
  const { id } = req.params;
  const { type,email, password, newPassword, confirmPassword } = req.body;
  if (_.isEmpty(id)) {
    return AppError(res, "User id is required", BADREQUEST);
  }

  const user = await getOneWP(id) 

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
    if (!(await user.isValidPassword(password))) {
      return AppError(res, "Old password is incorrect", BADREQUEST);
    }

    if (newPassword !== confirmPassword) {
      return AppError(
        res,
        "Password and confirm password does not match",
        BADREQUEST
      );
    }

    user.pswd = newPassword;
    await user.save();
  }

  if (user) {
    return AppSuccess(res, user, "User Updated successfully", SUCCESS);
  } else {
    return AppError(res, "Something went wrong", BADREQUEST);
  }
};
