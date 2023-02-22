import { Router } from "express";
import {
    getCarts,
    getCartByID, 
    createCart,
    createProductInCart
} from "../controllers/carts.controller.js";
const cartsRouter = Router(); 

cartsRouter.get("/", getCarts);
cartsRouter.get("/:cid", getCartByID);
cartsRouter.post("/", createCart);
cartsRouter.post("/:cid/products/:pid", createProductInCart);

export default cartsRouter;