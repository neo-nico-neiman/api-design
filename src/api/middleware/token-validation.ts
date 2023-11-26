import jwt from "jsonwebtoken";

const tokenValidation = (req, res, next) => {
	const bearer = req.headers.authorization;

	if (!bearer) {
		res.status(401);
		res.json({ message: "Not authorized" });
		return;
	}

	const [, token] = bearer.split(" ");
	if (!token) {
		console.log("no token");
		res.status(401);
		res.json({ message: "Not authorized" });
		return;
	}

	try {
		const payload = jwt.verify(token, process.env.JWT_SECRET);
		req.user = payload;
		console.log(payload);
		next();
	} catch (e) {
		console.log(e);
		res.status(401);
		res.json({ message: "Not authorized" });
		return;
	}
};

export { tokenValidation };
