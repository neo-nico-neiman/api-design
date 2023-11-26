import { Router } from "express";
import { body } from "express-validator";
import { handleBodyValidationErrors } from "../middleware";

const privateRoutes = Router();

privateRoutes.get("/product", (req, res) => {
	res.status(200);
	res.json({ message: "hi señor" });
});
privateRoutes.get("/product/:id", () => {});
privateRoutes.put(
	"/product/:id",
	[
		body("name").isString().trim().notEmpty().escape(),
		handleBodyValidationErrors,
	],
	(req, res) => {
		res.status(200);
		res.json({ message: "time to update" });
	}
);
privateRoutes.post("/product", () => {});
privateRoutes.delete("/product/:id", () => {});

privateRoutes.get("/update", () => {});
privateRoutes.get("/update/:id", () => {});
privateRoutes.put("/update/:id", () => {});
privateRoutes.post("/update/", () => {});
privateRoutes.delete("/update/:id", () => {});

privateRoutes.get("/update-point", () => {});
privateRoutes.get("/update-point/:id", () => {});
privateRoutes.put("/update-point/:id", () => {});
privateRoutes.post("/update-point/", () => {});
privateRoutes.delete("/update-point/:id", () => {});

export { privateRoutes };
