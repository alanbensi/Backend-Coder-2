import { Router } from "express";
import {
    getProducts,
    getProductByID,
    createNewProduct,
    updateProduct,
    deleteProduct
} from "../controllers/products.controller.js"

const productsRouter = Router(); 

productsRouter.get ("/", getProducts);
productsRouter.get ("/:pid", getProductByID);
productsRouter.post ("/", createNewProduct);
productsRouter.put ("/:pid", updateProduct);
productsRouter.delete ("/:pid", deleteProduct);

export default productsRouter;