import { prisma } from "../utils";

export class ProductHandlers {
	constructor() {}

	async getProducts(req, res, next) {
		try {
			const user = await prisma.user.findUnique({
				where: { username: req.user.username },
				include: { products: true },
			});

			res.json({ data: { products: user.products } });
		} catch (error) {
			next(error);
		}
	}

	async getProductById(req, res, next) {
		try {
			const product = await prisma.product.findUnique({
				where: { id: req.params.id },
			});

			res.json({ data: { product } });
		} catch (error) {
			next(error);
		}
	}

	async createProduct(req, res, next) {
		try {
			const newProduct = await prisma.product.create({
				data: {
					name: req.body.name,
					belongsToId: req.user.id as string,
				},
			});

			res.json({
				data: { newProduct },
			});
		} catch (error) {
			next(error);
		}
	}

	async updateProduct(req, res, next) {
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
			next(error);
		}
	}

	async deleteProduct(req, res, next) {
		try {
			const deleted = await prisma.product.delete({
				where: { id: req.params.id, belongsToId: req.user.id },
			});

			res.json({ data: { deleted } });
		} catch (error) {
			next(error);
		}
	}
}
