import productModel from "../models/product.model.js";

class ProductsMOngo {
  constructor() {}

  checkStockAndUpdate = async (products) => {
    try {
      let toPurchase = [];
      let noComprados = [];
  
      for (const prod of products) {
        const prodDb = await productModel.findById(prod.item._id).lean();
        // console.log(prodDb._id, prod.item._id);
        // console.log(prodDb.stock, prod.quantity);
  
        if (prodDb.stock >= prod.quantity) {
          toPurchase.push(prod);
  
          const newStock = prodDb.stock - prod.quantity;
          
          await this.updateProduct(prodDb._id, { stock: newStock })
        } else {
          noComprados.push(prod.item._id);
        }
      }
  
      
      return [toPurchase, noComprados];
    } catch (error) {
      console.error(`error: `, error);
    }
  };
  

  //routes methods
  getAll = async () => {
    try {
      const products = await productModel.find();
      return products;
    } catch (error) {
      console.error(`error al obtener productos:`, error);
    }
  };

  getById = async (productId) => {
    try {
      const product = await productModel.findById(productId).lean();
      if (!product) return `producto ${productId} no encontrado`;
      return product;
    } catch (error) {
      console.error(`error:`, error);
    }
  };

  createProduct = async (productData) => {
    try {
      const newProduct = await productModel.create(productData);
      return newProduct;
    } catch (error) {
      console.error(`error:`, error);
    }
  };

  updateProduct = async (productId, updatedProductData) => {
    try {
      const updatedProduct = await productModel.findByIdAndUpdate(
        productId,
        updatedProductData,
        { new: true }
      );
      return updatedProduct;
    } catch (error) {
      console.error(`error :`, error);
    }
  };

  deleteProduct = async (productId) => {
    try {
      const deletedProduct = await productModel.findByIdAndRemove(productId);
      return deletedProduct;
    } catch (error) {
      console.error("error", error);
    }
  };
}

export default ProductsMOngo;
