import { ErrorType } from "../../entities/errors";
import { createJWT } from "../../utils/create-jwt";
import { prisma } from "../../utils/db";
import { hashPassword } from "../../utils/password";

const signUp = async (req, res, next) => {
	try {
		const { username, password } = req.body;

		const isExistingUsername = await prisma.user.findUnique({
			where: { username },
		});

		if (isExistingUsername) {
			throw new Error("Username not available, please choose a different one.");
		}

		const user = await prisma.user.create({
			data: {
				username: username,
				password: await hashPassword(password),
				created_at: new Date(),
				updated_at: new Date(),
			},
		});

		const token = createJWT(user);

		res.status(200);
		res.json({ token });
	} catch (e) {
		e.type = ErrorType.INPUT;

		next(e);
	}
};

export { signUp };
