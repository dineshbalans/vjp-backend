import { Router } from "express";
import {
  CreateItem,
  deleteItem,
  getItem,
  getItems,
  updateItem,
} from "../controller/itemController.js";
import multer from "multer";

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

router.route("/item/create").post(upload.array("images"), CreateItem);
router.route("/item/update/:id").put(upload.array("images"), updateItem);
router.route("/items").get(getItems);
router.route("/item/:id").get(getItem);
router.route("/item/delete/:id").delete(deleteItem);

export default router;
