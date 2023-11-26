import { createJWT } from "../utils/create-jwt";
import { prisma } from "../utils/db";
import { hashPassword } from "../utils/password";

const createNewUser = async (req, res) => {
	const body = req.body;
	try {
		const { username, password } = body;
		if (!username && !password) {
			throw new Error("One or more reqired fields are missing");
		}

		const user = await prisma.user.create({
			data: {
				username: body.username,
				password: await hashPassword(body.password),
				created_at: new Date(),
				updated_at: new Date(),
			},
		});

		const token = createJWT(user);

		res.status(200);
		res.json({ token });
	} catch (e) {
		console.log(e);
		res.status(500);
		res.json({ message: e });
	}
};

export { createNewUser };
