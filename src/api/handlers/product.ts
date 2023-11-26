import { prisma } from "../utils";

export class ProductHandlers {
	constructor() {}

	async getProducts(req, res) {
		try {
			const user = await prisma.user.findUnique({
				where: { username: req.user.username },
				include: { products: true },
			});

			res.json({ data: { products: user.products } });
		} catch (error) {
			res.status(500);
			res.json({ error });
		}
	}

	async getProductById(req, res) {
		try {
			const product = await prisma.product.findUnique({
				where: { id: req.params.id },
			});

			res.json({ data: { product } });
		} catch (error) {
			res.status(500);
			res.json({ error });
		}
	}

	async createProduct(req, res) {
		try {
			const newProduct = await prisma.product.create({
				data: {
					name: req.body.name,
					created_at: new Date(),
					updated_at: new Date(),
					belongsToId: req.user.id as string,
				},
			});

			res.json({
				data: { newProduct },
			});
		} catch (error) {
			res.status(500);
			res.json({ error });
		}
	}

	async updateProduct(req, res) {
		try {
			const updated = await prisma.product.update({
				where: { id: req.params.id, belongsToId: req.user.id },
				data: {
					name: req.body.name,
					updated_at: new Date(),
				},
			});

			res.json({ data: { updated } });
		} catch (error) {
			res.status(500);
			res.json({ error });
		}
	}

	async deleteProduct(req, res) {
		try {
			const deleted = await prisma.product.delete({
				where: { id: req.params.id, belongsToId: req.user.id },
			});

			res.json({ data: { deleted } });
		} catch (error) {
			res.status(500);
			res.json({ error });
		}
	}
}
