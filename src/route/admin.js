import { Router } from "express";
import { getDashboard, loginAdmin,logoutAdmin } from "../controller/adminController.js";
import { isAuthenticatedAdminUser } from "../utils/middlewares/authenticate.js";
const router = Router();

router.route("/dashboard").get(isAuthenticatedAdminUser ,getDashboard);
router.route("/login").post(loginAdmin);
router.route("/logout").get(isAuthenticatedAdminUser,logoutAdmin);

export default router;
