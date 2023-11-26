import * as bcrypt from "bcrypt";

const isValidPassword = (password, hash) => {
	return bcrypt.compare(password, hash);
};

const hashPassword = (password) => {
	return bcrypt.hash(password, 5);
};

export { isValidPassword, hashPassword };
