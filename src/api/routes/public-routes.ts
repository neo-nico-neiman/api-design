import { Router } from "express";
import { signUp, signIn } from "../handlers/user";
import { credentialsValidation } from "../middleware";

const publicRoutes = Router();

publicRoutes.get("/", (req, res) => {
	res.status(200);
	res.json({ message: "hello" });
});
publicRoutes.post("/sign-up", credentialsValidation, signUp);
publicRoutes.post("/sign-in", credentialsValidation, signIn);

export { publicRoutes };
