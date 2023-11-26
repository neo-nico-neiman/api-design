import { Router } from "express";
import { ProductRoutes } from "../handlers/product";
import { productNameValidationChain } from "../middleware";

const router = Router();
const product = new ProductRoutes();

router.get("/product", product.getProducts);
router.get("/product/:id", product.getProductById);
router.put("/product/:id", productNameValidationChain, product.updateProduct);
router.post("/product", productNameValidationChain, product.createNewProduct);
router.delete("/product/:id", product.deleteProduct);

router.get("/update", () => {});
router.get("/update/:id", () => {});
router.put("/update/:id", () => {});
router.post("/update/", () => {});
router.delete("/update/:id", () => {});

router.get("/update-point", () => {});
router.get("/update-point/:id", () => {});
router.put("/update-point/:id", () => {});
router.post("/update-point/", () => {});
router.delete("/update-point/:id", () => {});

export { router as privateRoutes };
