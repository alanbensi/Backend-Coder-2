import express from "express";
import cartsRouter from "./src/routes/carts.routes.js";
import productsRouter from "./src/routes/products.routes.js";
import hbs from "express-handlebars";

const app = express();


const PORT = process.env.PORT || 8080

const server = app.listen (PORT, ()=> {
    console.log(`Server running on port ${server.address().port}`);
})

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.engine("handlebars", hbs.engine());
app.set("view engine", "handlebars"); 
app.set("views", "./views");
app.use (express.static("./src/public"));


app.use ("/carts", cartsRouter);
app.use ("/products", productsRouter);

server.on ("error",error => console.log (error));