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
import path from "path";
import { fileURLToPath } from "url";

// Fix for __dirname not defined in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = Router();

// const upload = multer({
//   storage: multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, path.join(__dirname, "..", "uploads/item"));
//     },
//     filename: function (req, file, cb) {
//       cb(null, file.originalname);
//     },
//   }),
// })

const createDirectory = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      // Extract category and itemTitle from the request body
      const { category, itemTitle } = req.body;

      // Construct the dynamic folder path
      const uploadPath = path.join(
        __dirname,
        "..",
        "uploads",
        category,
        itemTitle
      );

      // Create the directory if it doesn't exist
      createDirectory(uploadPath);

      // Set the destination folder
      cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
      // Use the original filename
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
  .put(isAuthenticatedAdminUser, upload.array("newImages"), updateItem);
router.route("/item/delete/:id").delete(isAuthenticatedAdminUser, deleteItem);

// common
router.route("/items").get(getItems);
router.route("/item/:id").get(getItem);

export default router;
