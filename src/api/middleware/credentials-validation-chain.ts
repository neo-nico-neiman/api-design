import { body } from "express-validator";
import { handleBodyValidationErrors } from "../utils";

const createCredentialsValidationChain = () =>
	body(["username", "password"])
		.trim()
		.notEmpty()
		.escape()
		.withMessage("Invalid credentials");

const credentialsValidationChain = [
	createCredentialsValidationChain(),
	handleBodyValidationErrors,
];

export { credentialsValidationChain };
