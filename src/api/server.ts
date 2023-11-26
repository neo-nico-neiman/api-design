import express from "express";
import { privateRoutes, publicRoutes } from "./routes";
import morgan from "morgan";
import cors from "cors";
import { tokenValidation } from "./middleware";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", publicRoutes);

app.use("/api", tokenValidation, privateRoutes);

export default app;
