import { body } from "express-validator";
import { handleBodyValidationErrors } from "./handle-body-validation-errors";

const createCredentialsValidationChain = () =>
	body(["username", "password"])
		.isString()
		.trim()
		.notEmpty()
		.escape()
		.withMessage("Invalid credentials");

const credentialsValidationChain = [
	createCredentialsValidationChain(),
	handleBodyValidationErrors,
];

export { credentialsValidationChain };
