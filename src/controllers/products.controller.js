// import {
//     getProductsService,
//     getProductByIDService,
//     createNewProductService,
//     updateProductService,
//     deleteProductService
// } from "../services/products/products.services.js"

import {
    getProductsService,
    getProductByIDService,
    createNewProductService,
    updateProductService,
    deleteProductService
} from "../db/servicesDB/products.services.js"


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

export const getProductByID = async (req,res)=> {
    try {
        const productId = req.params.pid;
        const product = await getProductByIDService(productId);
        res.render("productByID", { 
            product: product,
            styles: "products.css"
        });
    } catch (error) {
        res.status(400).send({ status: "Error", message: "Error. The product wasn´t found" })
    }
}

export const createNewProduct = async (req,res) => {    
    try {
        const product = req.body;
        const newProduct = await createNewProductService(product); 
        res.send ({status: "Success", newProduct: newProduct});
    } catch (error) {
        res.status(400).send ({status: "Error", message: "The request has an error"}); 
        console.log (error);
    }
}


export const updateProduct = async (req,res) => {
    try {
        const id = req.params.pid;
        const product = req.body;
        if (!id) {
            throw new Error ("Error. The product doesn´t exists");
        } else {
            const result = await updateProductService(id,product);
            res.send({status: "success", product: result});
        }   
    } catch (error) {
        res.status(400).send({ status: "Error", message: "Error" });
        console.log("error", error);
    }
}

export const deleteProduct = async (req,res) => {
    try {
        const idProduct = req.params.pid; 
        if (!idProduct) {
            throw new Error ("Error. The product doesn´t exists");
        } else {
            const deleteProduct = await deleteProductService(idProduct);
            console.log ("producto en service", deleteProduct);
            res.send ({status: "Success", product: deleteProduct});
        }
    } catch (error) {
        res.status(400).send({ status: "Error", message: "Error" });
    }
}