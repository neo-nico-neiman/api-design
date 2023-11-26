import { createJWT } from "../../utils/create-jwt";
import { prisma } from "../../utils/db";
import { isValidPassword } from "../../utils/password";

const genericErrorMessage = "Invalid credentials";

const signIn = async (req, res) => {
	try {
		const { username, password } = req.body;

		const user = await prisma.user.findUnique({
			where: { username: username },
		});

		if (!user) {
			res.status(401);
			res.json({ message: genericErrorMessage });
			return;
		}

		const isValid = await isValidPassword(password, user.password);

		if (!isValid) {
			res.status(401);
			res.json({ message: genericErrorMessage });
			return;
		}

		const token = createJWT(user);
		res.status(200);
		res.json({ token, user });
	} catch (e) {
		console.log(e);
		res.status(500);
		res.json({ message: e });
	}
};

export { signIn };
