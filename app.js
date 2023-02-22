import express, { urlencoded } from "express";
import cartsRouter from "./src/routes/carts.routes.js";
import productsRouter from "./src/routes/products.routes.js";

const app = express();

const server = app.listen ("8080", ()=> {
    console.log("Server running on port 8080");
})

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use ("/carts", cartsRouter);
app.use ("/products", productsRouter);

server.on ("error",error => console.log (error));