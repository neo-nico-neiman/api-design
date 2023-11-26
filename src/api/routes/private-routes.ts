import { Router } from "express";
import { ProductHandlers, UpdateHandlers } from "../handlers";
import { productNameValidationChain } from "../middleware";

const router = Router();
const product = new ProductHandlers();
const updates = new UpdateHandlers();

router.get("/product", product.getProducts);
router.get("/product/:id", product.getProductById);
router.put("/product/:id", productNameValidationChain, product.updateProduct);
router.post("/product", productNameValidationChain, product.createProduct);
router.delete("/product/:id", product.deleteProduct);

// TODO: add middleware for validation
router.get("/update/:id", updates.getUpdateById);
router.put("/update/:id", updates.updateUpdate);
router.post("/update", updates.createUpdate);
router.delete("/update/:id", updates.deleteUpdate);

router.get("/update-point", () => {});
router.get("/update-point/:id", () => {});
router.put("/update-point/:id", () => {});
router.post("/update-point", () => {});
router.delete("/update-point/:id", () => {});

export { router as privateRoutes };
