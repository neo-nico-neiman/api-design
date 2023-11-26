import { body } from "express-validator";
import { handleBodyValidationErrors } from "./handle-body-validation-errors";

const createProductNameValidationChain = () =>
	body("name")
		.isString()
		.trim()
		.notEmpty()
		.escape()
		.withMessage("Property name is required");

const productNameValidationChain = [
	createProductNameValidationChain(),
	handleBodyValidationErrors,
];

export { productNameValidationChain };
