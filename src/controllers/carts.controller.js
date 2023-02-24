import {
    getCartsService,
    getCartByIDService,
    createCartService,
    createProductInCartService
} from "../db/servicesFilesystem/carts/carts.services.js"

export const getCarts = async (req,res) => {
    try {
        const carts = await getCartsService();
        res.send (({status: "Success!", carts: carts}));
    } catch (error) {
        res.status(400).send({ status: "Error", message: "Error" }, ()=>{
            console.log(error);
        })
    }
}

export const createCart = async (req,res) => { 
    try {
        const newCart = await createCartService();
        res.send (({status: "Success! The cart was succesfully added", cart: newCart})); 
    } catch (error) {
        res.status(400).send({ status: "Error", message: "Error" }, ()=>{
            console.log(error);
        })
    }
}

export const getCartByID = async (req,res) => {
    try {
        const cartID = req.params.cid; 
        const cart = await getCartByIDService (parseInt(cartID));   
        res.send(({status: "Success!", cart: cart})); 
    } catch (error) {
        res.status(400).send({ status: "Error", message: "Error" }, ()=>{
            console.log(error);
        })
    }
}

export const createProductInCart = async (req,res) => {
    try {
        const cartID = req.params.cid;
        const productID = req.params.pid;
        const createProductInCart = await createProductInCartService(parseInt(cartID), parseInt(productID));
        res.send ({status:"Success", productInCart: createProductInCart})
    } catch (error) {
        res.status(400).send({ status: "Error", message: "Error" }, ()=>{
            console.log(error);
        })
    }
}