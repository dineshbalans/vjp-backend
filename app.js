import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { fileURLToPath } from 'url';
import path from "path";
import cookieParser from "cookie-parser";
// import "./src/config/index.js";
import categoryRoute from "./src/route/category.js";
import userRoute from "./src/route/user.js";
import itemRoute from "./src/route/item.js";
import adminRoute from "./src/route/admin.js";
import orderRoute from './src/route/order.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


dotenv.config({ path: path.join(__dirname, "./.env") });

console.log(process.env.PORT, "env in app");

const app = express();
app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/src/uploads", express.static(path.join(__dirname, "src/uploads")));

app.use("/api/v1", categoryRoute);
app.use("/api/v1", userRoute);
app.use("/api/v1", itemRoute);
app.use("/api/v1/admin",adminRoute);
app.use("/api/v1", orderRoute);

export default app;
