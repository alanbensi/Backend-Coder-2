import mongoose from "mongoose";

mongoose.connect("mongodb+srv://AlanBensi:alanriver@ecommerce.7k0stni.mongodb.net/EcommerceAlanCoder?retryWrites=true&w=majority", error=>{
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
            const allProducts = this.productsCollection.find().lean();
            return allProducts;
        } catch (error) {
            console.log(error);
        }
    }

    getProductsByIdDB(id) {
        try {
            const product = this.productsCollection.findOne({_id:id});
            return product;
        } catch (error) {
            console.log (error);
        }
    } 

    createNewProductDB(product) {
        try {
            const result = this.productsCollection.create(product);
            return result;
        } catch (error) {
            console.log (error);
        }
    }

    async updateProductDB(id,product) {
        try {
            const productUpdated = await this.productsCollection.updateOne({ _id:id }, product);
            return productUpdated;
        } catch (error) {
            console.log(error);
        }
    }

    async deleteProductDB (idProduct) {
        try {
            const product = await this.productsCollection.deleteOne({_id:idProduct});
            console.log ("Producto a eliminar",product);
            return product;
        } catch (error) {
            console.log(error);
        }
    }

}

export default contenedorMongoDB;