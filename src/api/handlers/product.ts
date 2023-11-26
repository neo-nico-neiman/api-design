import { prisma } from "../utils";

export class ProductRoutes {
	constructor() {}

	async getProducts(req, res) {
		try {
			const user = await prisma.user.findUnique({
				where: { username: req.user.username },
				include: { products: true },
			});

			res.status(200);
			res.json({ data: { products: user.products } });
		} catch (error) {
			res.status(500);
			res.json({ error });
		}
	}

	async getProductById(req, res) {
		try {
			const product = await prisma.product.findUnique({
				where: { id: req.params.id, belongsTo: req.user.id },
			});

			res.status(200);
			res.json({ data: { product } });
		} catch (error) {
			res.status(500);
			res.json({ error });
		}
	}

	async createNewProduct(req, res) {
		try {
			const newProduct = await prisma.product.create({
				data: {
					name: req.body.name,
					created_at: new Date(),
					updated_at: new Date(),
					belongsToId: req.user.id as string,
				},
			});

			res.status(200);
			res.json({
				data: { newProduct, message: "Product succesfully created" },
			});
		} catch (error) {
			res.status(500);
			res.json({ error });
		}
	}

	async updateProduct(req, res) {
		try {
			const product = await prisma.product.update({
				where: { id: req.params.id, belongsTo: req.user.id },
				data: {
					name: req.body.name,
					updated_at: new Date(),
				},
			});

			res.status(200);
			res.json({ data: { product, message: "Product succesfully updated" } });
		} catch (error) {
			res.status(500);
			res.json({ error });
		}
	}

	async deleteProduct(req, res) {
		try {
			await prisma.product.delete({
				where: { id: req.params.id },
			});

			res.status(200);
			res.json({ message: "Product succesfully deleted" });
		} catch (error) {
			res.status(500);
			res.json({ error });
		}
	}
}
