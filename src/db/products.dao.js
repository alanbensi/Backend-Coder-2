import mongoose from "mongoose";

mongoose.connect("mongodb+srv://AlanBensi:alanecommerce@ecommerce.7k0stni.mongodb.net/?retryWrites=true&w=majority", error=>{
    if(error) {
        console.log(error, "Cannot connect to DB");
        process.exit();
    }else {
        console.log("Connected to DB");
    }
})

class contenedorMongoDB {
    constructor (collection, schema) {
        this.productsCollection = mongoose.model (collection,schema);
    }
    getProductsDB() {
        try {
            const allProducts = this.productsCollection.find();
            return allProducts;
        } catch (error) {
            console.log(error);
        }
    }
    // createNewProductService (title, description, price, thumbnail, code, stock) {
    //     try {
    //         const allProducts = 
    //         return allProducts;
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }
}

export default contenedorMongoDB;