import { prisma } from "../utils";

export class UpdateHandlers {
	constructor() {}

	async getUpdateById(req, res) {
		try {
			const update = await prisma.update.findFirst({
				where: { id: req.params.id },
			});

			res.json({ data: { update } });
		} catch (error) {
			res.status(500);
			res.json({ error });
		}
	}

	async createUpdate(req, res) {
		try {
			const { title, body, status, productId } = req.body;
			const product = prisma.product.findUnique({
				where: { id: productId },
			});

			if (!product) {
				res.status(400);
				res.json({ message: "Not your product" });
				return;
			}

			const newUpdate = await prisma.update.create({
				data: {
					title,
					body,
					status,
					product: { connect: { id: productId } },
				},
			});

			res.json({
				data: { newUpdate },
			});
		} catch (error) {
			res.status(500);
			res.json({ error });
		}
	}

	async updateUpdate(req, res) {
		try {
			const { title, body, status, productId } = req.body;

			const product = await prisma.product.findMany({
				where: {
					belongsToId: req.user.id,
				},
				include: {
					updates: true,
				},
			});

			//TODO: remove the code below , instead filter in the query, and additionaly prevent data manipulation
			const updates = product.reduce((allUpdates, product) => {
				return [...allUpdates, ...product.updates];
			}, []);

			const match = updates.find((update) => update.id === req.params.id);

			if (!match) {
				res.json({ message: "Not your product" });

				res.json(400);
				return;
			}

			const updated = await prisma.update.update({
				where: { id: req.params.id, productId },
				data: {
					title,
					body,
					status,
					productId,
					updated_at: new Date(),
				},
			});

			res.json({ data: { updated } });
		} catch (error) {
			res.status(500);
			res.json({ error });
		}
	}

	async deleteUpdate(req, res) {
		try {
			const updateId = req.params.id;
			const product = await prisma.product.findMany({
				where: {
					belongsToId: req.user.id,
				},
				include: {
					updates: true,
				},
			});

			//TODO: remove the code below , instead filter in the query, and additionaly prevent data manipulation
			const updates = product.reduce((allUpdates, product) => {
				return [...allUpdates, ...product.updates];
			}, []);

			const match = updates.find((update) => update.id === updateId);

			if (!match) {
				res.json({ message: "Not your product" });

				res.json(400);
				return;
			}

			const deleted = await prisma.update.delete({
				where: { id: updateId },
			});

			res.json({ data: { deleted } });
		} catch (error) {
			res.status(500);
			res.json({ error });
		}
	}
}
