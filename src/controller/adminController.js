import { getAll as getAllCategories } from "../service/categotyService.js";
import { getAll as getItems } from "../service/itemService.js";
import { getAll as getAllUsers } from "../service/userService.js";
import { BADREQUEST, SUCCESS } from "../utils/constants/statusCode.js";
import AppError from "../utils/response-handlers/app-error.js";
import AppSuccess from "../utils/response-handlers/app-success.js";

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
