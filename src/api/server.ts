import express from "express";
import { privateRoutes, publicRoutes } from "./routes";
import morgan from "morgan";
import cors from "cors";
import { tokenValidation } from "./middleware";
import { ErrorType } from "./entities/errors";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", publicRoutes);

app.use("/api", tokenValidation, privateRoutes);

app.use((err, req, res, next) => {
	if (err === ErrorType.AUTH) {
		res.status(401).json({ message: "unathorized" });
	}
	if (err === ErrorType.INPUT) {
		res.status(409).json({ message: "invalid input" });
	}
	console.log({ err });
	res.status(500).json({ message: "Internal error" });
});

export default app;
