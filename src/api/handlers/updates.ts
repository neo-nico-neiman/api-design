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
			const newUpdate = await prisma.update.create({
				data: {
					title,
					body,
					status,
					productId,
					created_at: new Date(),
					updated_at: new Date(),
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
			const deleted = await prisma.update.delete({
				where: { id: req.params.id, productId: req.body.productId },
			});

			res.json({ data: { deleted } });
		} catch (error) {
			res.status(500);
			res.json({ error });
		}
	}
}
