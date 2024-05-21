import { Router } from "express";
import { InsertUser, verifyUser } from "../controller/verifyUserController.js";


const router = Router();

router.route("/verify").post(verifyUser);
router.route("/verify/:token").post(InsertUser);

export default router