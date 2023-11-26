const genericErrorMessage = "Invalid credentials";

const credentialsValidation = (req, res, next) => {
	const { username, password } = req.body;

	if (!username || !password) {
		res.status(401);
		res.json({ message: genericErrorMessage });
		return;
	}

	next();
};

export { credentialsValidation };
