import { Router } from "express";
import { signUp, signIn } from "../handlers/user";
import { credentialsValidationChain } from "../middleware";

const publicRoutes = Router();

publicRoutes.get("/", (req, res) => {
	res.status(200);
	res.json({ message: "hello" });
});

publicRoutes.post("/sign-up", credentialsValidationChain, signUp);
publicRoutes.post("/sign-in", credentialsValidationChain, signIn);

export { publicRoutes };
