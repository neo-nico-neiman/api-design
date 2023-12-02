import { ErrorType } from "../entities/errors";
import { createJWT, hashPassword, isValidPassword, prisma } from "../utils";

const genericErrorMessage = "Invalid credentials";

export class UserHandlers {
	constructor() {}

	async signIn(req, res, next) {
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
	}

	async signUp(req, res, next) {
		try {
			const { username, password } = req.body;

			const isExistingUsername = await prisma.user.findUnique({
				where: { username },
			});

			if (isExistingUsername) {
				throw new Error(
					"Username not available, please choose a different one."
				);
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
	}
}
