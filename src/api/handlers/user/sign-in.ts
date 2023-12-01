import { ErrorType } from "../../entities/errors";
import { createJWT } from "../../utils/create-jwt";
import { prisma } from "../../utils/db";
import { isValidPassword } from "../../utils/password";

const genericErrorMessage = "Invalid credentials";

const signIn = async (req, res, next) => {
	try {
		const { username, password } = req.body;

		const user = await prisma.user.findUnique({
			where: { username },
		});

		if (!user) {
			throw new Error(genericErrorMessage);
		}

		const isValid = await isValidPassword(password, user.password);

		if (!isValid) {
			throw new Error(genericErrorMessage);
		}

		const token = createJWT(user);
		res.status(200);
		res.json({ token, user });
	} catch (e) {
		// TODO check the error message from Prisma and add specificity to the error
		e.type = ErrorType.INPUT;
		next(e);
	}
};

export { signIn };
