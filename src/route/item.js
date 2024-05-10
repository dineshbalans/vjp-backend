import { Router } from "express";
import {
  CreateItem,
  deleteItem,
  getItem,
  getItems,
  updateItem,
} from "../controller/itemController.js";
import multer from "multer";
import { isAuthenticatedAdminUser } from "../utils/middlewares/authenticate.js";

const router = Router();

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, "..", "uploads/users"));
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },  
  }),
});

// Admin

router
  .route("/item/create")
  .post(isAuthenticatedAdminUser, upload.array("images"), CreateItem);
router
  .route("/item/update/:id")
  .put(isAuthenticatedAdminUser, upload.array("images"), updateItem);
router.route("/item/delete/:id").delete(isAuthenticatedAdminUser, deleteItem);

// common
router.route("/items").get(getItems);
router.route("/item/:id").get(getItem);

export default router;
