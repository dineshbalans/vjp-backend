import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";
import cookieParser from "cookie-parser";
import categoryRoute from "./src/route/category.js";
import userRoute from "./src/route/user.js";
import itemRoute from "./src/route/item.js";
import adminRoute from "./src/route/admin.js";
import orderRoute from "./src/route/order.js";
import globalResponseController from "./src/utils/response-handlers/global-response-controller.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/src/uploads", express.static(path.join(__dirname, "src/uploads")));

app.use("/api/v1", categoryRoute);
app.use("/api/v1", userRoute);
app.use("/api/v1", itemRoute);
app.use("/api/v1/admin", adminRoute);
app.use("/api/v1", orderRoute);

app.use(globalResponseController);

export default app;
