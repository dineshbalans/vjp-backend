import { Router } from "express";
import { getDashboard } from "../controller/adminController.js";
const router = Router();





 
router.route("/dashboard").get(getDashboard);
 
export default router;
