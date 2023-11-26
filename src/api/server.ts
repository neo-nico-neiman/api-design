import express from "express";
import router from "./router";
import morgan from "morgan";
import cors from "cors";
import { protectRoutes } from "./middleware/auth/protect-routes";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
	res.status(200);
	res.json({ message: "hello" });
});

app.use("/api", protectRoutes, router);

export default app;
