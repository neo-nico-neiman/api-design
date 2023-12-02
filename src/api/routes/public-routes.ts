import { Router } from "express";
import { credentialsValidationChain } from "../middleware";
import { UserHandlers } from "../handlers/user";

const router = Router();
const user = new UserHandlers();
router.get("/", (req, res) => {
	res.status(200);
	res.json({ message: "hello" });
});

router.post("/sign-up", credentialsValidationChain, user.signUp);
router.post("/sign-in", credentialsValidationChain, user.signIn);

export { router as publicRoutes };
