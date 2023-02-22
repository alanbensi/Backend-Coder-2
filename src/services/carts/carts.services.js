import fs from "fs"

export const createCartService = async ()=> {
    const getCarts = await getCartsService();
    let newCart = {
        id: await createNewID (),
        products: []
    }
    try {
        if (newCart.id && newCart.products) {
            getCarts.push(newCart);
            console.log("The cart was succesfully added");
            fs.promises.writeFile("./src/services/carts/carts.json" ,JSON.stringify(getCarts));
        } else {
            console.log("Error. Please complete all the fields");
        }
    } catch (error) {
        console.log (error); 
        return error;
    }
}

const createNewID = async () => {
    const getAllCarts = await getCartsService();
    let newID;
    if (getAllCarts.length === 0) {
        newID = 1
    } else {
        newID = getAllCarts[getAllCarts.length - 1].id + 1;
    }
    return newID;
}

export const getCartsService = async () => {
    try {
        const allCarts = await fs.promises.readFile("./src/services/carts/carts.json", "utf-8");
        return JSON.parse(allCarts);
    } catch (error) {
        console.log(error);
    }
}

export const getCartByIDService = async (id) => {
    const getCarts = await getCartsService();
    const cartID = getCarts.find(product => product.id === id);
    if (!cartID) {
        return "Error. This product is not found";
    } else {
        return cartID;
    }
}

export const createProductInCartService = async (cartID, productID) => {
    const getCarts = await getCartsService(); 
    const cartID2 = getCarts.findIndex (item => item.id === cartID); 
    let newProduct;
    const cart = getCarts[cartID2];
    if (cart.products.length > 0 && cart.products.some(item => item.product === productID)) {
        const findProductId = cart.products.find((e) => e.product === productID);
        if (findProductId) {
            findProductId.quantity = findProductId.quantity + 1;
        }else {
            newProduct = {
                product: productID,
                quantity: 1
            }
            cart.products.push(newProduct);
        }
    } else {
        newProduct = {
            product: productID,
            quantity: 1
        }
        cart.products.push(newProduct);
    }
    if (cartID2 && productID) {
        await fs.promises.writeFile("./src/services/carts/carts.json", JSON.stringify(getCarts));
    }
}
