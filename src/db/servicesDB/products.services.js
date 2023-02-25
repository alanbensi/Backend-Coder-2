import contenedorMongoDB from "../products.dao.js";
import productsSchema from "../models/products.models.js";

const productModel = new contenedorMongoDB("products", productsSchema);

export const getProductsService = async () => {
    try {
        const products = await productModel.getProductsDB();
        return products;
    } catch (error) {
        console.log (error);
    }
}

export const createNewProductService = async (product) =>  {
    try {
        const newProduct = await productModel.createNewProductDB(product);
        console.log("PRODUCTO NUEVO", newProduct);
        return newProduct;
    } catch (error) {
        console.log(error);
    }
}

