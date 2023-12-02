import jwt from "jsonwebtoken";
import config from "../../config";

const createJWT = (user) => {
	const token = jwt.sign(
		{ id: user.id, username: user.username },
		config.secrets.JWT_SECRET
	);

	return token;
};

export { createJWT };
