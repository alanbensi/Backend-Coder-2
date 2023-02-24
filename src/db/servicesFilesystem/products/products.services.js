import fs from "fs"; 

export const getProductsService = async () => {
    try {
        const allProducts = await fs.promises.readFile("./src/services/products/products.json", "utf-8");
        return JSON.parse(allProducts);
    } catch (error) {
        console.log(error);
    }
}

export const getProductByIDService = async (id) => {
    const getProducts = await getProductsService();
    const productID = getProducts.find (product => product.id === id);
    if (!productID) {
        throw new error ("Error. This product is not found");
    } else {
        return productID;
    }
}

export const createNewProductService = async (title, description, price, thumbnail, code, stock) => {
    const getProducts = await getProductsService(); 
    let newProduct = {
        id: await addNewId(getProducts),
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
        status:true
    } 
    try {
        if (newProduct.title && newProduct.description && newProduct.price && newProduct.thumbnail && newProduct.code && newProduct.stock &&  await validateCode(code, getProducts)) {
            getProducts.push(newProduct);
            console.log("The product was succesfully added");
            await fs.promises.writeFile("./src/services/products/products.json", JSON.stringify(getProducts));
        } else {
            console.log("Error. Please complete all the fields");
        }
    } catch (error) {
        console.log (error);
    }
}

const addNewId = (getProducts) => {
    let newID; 
    if (getProducts.length === 0 ){
        newID = 1
    } else {
        newID = getProducts[getProducts.length-1].id + 1;
    }
    return newID;
}

const validateCode = async (code, getProducts) => {
    let result = true; 
    let existCode = getProducts.find (product => product.code === code);
    if (existCode) { 
        result = false;
        console.log ("This code already exists! Please change the code of the new product");
    }
    return result;
}

export const updateProductService = async (id, field, value) => {
    const getProducts = await getProductsService();
    const idProducto = getProducts.find(product => product.id === id);
    if (!idProducto) {
        throw new Error ("Error. This product is not found");
    } else {
        idProducto[field] = value;
        await fs.promises.writeFile("./src/services/products/products.json", JSON.stringify(getProducts));
        console.log (idProducto, "producto modificado");
        return idProducto
    }
}

export const deleteProductService = async (id) => {
    const allProducts = await getProductsService();
    const newAllProducts = allProducts.filter (product => product.id !== id);
    await fs.promises.writeFile("./src/services/products/products.json", JSON.stringify(newAllProducts));
}