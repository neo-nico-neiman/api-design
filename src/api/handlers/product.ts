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
		} catch (e) {}
	}

	async getProductById(req, res) {}

	async createNewProduct(req, res) {
		try {
			await prisma.product.create({
				data: {
					name: req.body.name,
					created_at: new Date(),
					updated_at: new Date(),
					belongsToId: req.user.id as string,
				},
			});

			res.status(200);
			res.json({ message: "Product succesfully created" });
		} catch (e) {
			console.log(e);
			res.status(500);
			res.json({ error: e });
		}
	}

	async updateProduct(req, res) {}

	async deleteProduct(req, res) {}
}
