import {
    getProductsService,
    getProductByIDService,
    createNewProductService,
    updateProductService,
    deleteProductService
} from "../services/products/products.services.js"

export const getProducts = async (req,res)=> {
    try {
        const limit = req.query.limit;
        const allProducts = await getProductsService();
        if (limit) {
            if (limit < allProducts.length) {
                const newArrayLimit = allProducts.slice(0, limit);
                res.render("products", { 
                    products:newArrayLimit,
                    styles:"products.css" 
                });
            }else {
                res.status(400).send ({status: "Error", message:"There isnt exist that quantity of products"})
            }
        } else {
            res.render("products", { 
                products:allProducts,
                styles:"products.css" 
            });; 
        }
    } catch (error) {
        res.status(400).send ({status: "Error", message: error})
    }
}

export const getProductsByID = async (req,res)=> {
    try {
        const productId = req.params.pid;
        const product = await getProductByIDService(parseInt(productId));
        res.send({ status: "Success", product: product });
    } catch (error) {
        res.status(400).send({ status: "Error", message: "Error. The product wasn´t found" })
    }
}

export const createNewProduct = async (req,res) => {    
    try {
        const product = req.body;
        const newProduct = await createNewProductService(product.title, product.description, product.price, product.thumbnail, product.code, product.stock); 
        res.send ({status: "Success", newProduct: newProduct});
    } catch (error) {
        res.status(400).send ({status: "Error", message: "The request has an error"}); 
        console.log (error);
    }
}


export const updateProduct = async (req,res) => {
    try {
        const idProduct = req.params.pid;
        const oldProduct = req.body; 
        const updateProduct = await updateProductService (parseInt (idProduct), oldProduct.field, oldProduct.value); 
        res.send ({status: "Success", product: updateProduct});
    } catch (error) {
        res.status(400).send({ status: "Error", message: "Error" })
    }
}

export const deleteProduct = async (req,res) => {
    try {
        const idProduct = req.params.pid; 
        if (!idProduct) {
            throw new Error ("Error. The product doesn´t exists");
        } else {
            const deleteProduct = await deleteProductService(parseInt(idProduct));
            res.send ({status: "Success", product: deleteProduct});
        }
    } catch (error) {
        res.status(400).send({ status: "Error", message: "Error" })
    }
}