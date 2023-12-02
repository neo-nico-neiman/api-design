import jwt from "jsonwebtoken";
import config from "../../config";

const createJWT = (user) => {
	const token = jwt.sign(
		{ id: user.id, username: user.username },
		config.secrets.jwt
	);

	return token;
};

export { createJWT };
