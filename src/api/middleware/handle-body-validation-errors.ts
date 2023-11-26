import { validationResult } from "express-validator";

const handleBodyValidationErrors = (req, res, next) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		res.status(400);
		res.json({ errors: errors.array() });
		return;
	}

	next();
};

export { handleBodyValidationErrors };
