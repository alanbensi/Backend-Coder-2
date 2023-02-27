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

export const getProductByIDService = async (id)=> {
    try {
        const product = await productModel.getProductsByIdDB(id);
        return product;
    } catch (error) {
        console.log(error)
    }
}

export const createNewProductService = async (product) =>  {
    try {
        const newProduct = await productModel.createNewProductDB(product);
        return newProduct;
    } catch (error) {
        console.log(error);
    }
}

export const updateProductService = async (id,product) => {
    try {
        const productService = await productModel.updateProductDB(id,product);
        console.log("Product en srvice", productService);
        return product;
    } catch (error) {
        console.log(error);
    }
}
