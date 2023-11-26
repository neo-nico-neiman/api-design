import { Router } from "express";
import { signUp, signIn } from "../handlers/user";
import { credentialsValidationChain } from "../middleware";

const router = Router();

router.get("/", (req, res) => {
	res.status(200);
	res.json({ message: "hello" });
});

router.post("/sign-up", credentialsValidationChain, signUp);
router.post("/sign-in", credentialsValidationChain, signIn);

export { router as publicRoutes };
