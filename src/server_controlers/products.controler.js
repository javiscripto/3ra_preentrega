import ProductsMOngo from "../DAO/classes/productsClass.js";
import productModel from "../DAO/models/product.model.js";

const productService=new ProductsMOngo();

export const getAll=async(req, res)=>{
    const page= parseInt(req.query.page)||1;
    const limit = parseInt(req.query.limit) || 10;


    try {
        const options={page,limit};

        const result=await productModel.paginate({},options);


        const hasPreviousPage = page > 1;
        const hasNextPage = page < result.totalPages;
        const previousPage = hasPreviousPage ? page - 1 : page;
        const nextPage = hasNextPage ? page + 1 : page;
    
        const dbProducts = result.docs.map((product) => product.toObject()); // Convertir a objetos JSON
    
        const user= req.session.user//usuario traido desde la ruta /register para usarlo en la vista products
        res.render('products', {
          dbProducts,
          hasPreviousPage,
          hasNextPage,
          previousPage,
          nextPage,
          currentPage: page,
          limit,
          user
        })
    } catch (error) {
        res.status(500).json({ result: "error", message: error.message });
    }
};






export const getById= async(req, res)=>{
    try {
        
        const pid= req.params.pid;
        const product= await productService.getById(pid);
        res.render("detail",{product})
    } catch (error) {
        res.status(500).json({ result: "error", message: error.message });
    }
}


export const createProduct= async( req, res)=>{
    try {
        const newProduct= req.body;
        if(!newProduct.title||!newProduct.description||!newProduct.code||!newProduct.price||!newProduct.status||!newProduct.stock||!newProduct.cat){
            res.send("faltan datos")
        }
        const createdProduct= await productService.createProduct(newProduct)
        res.json(createdProduct)

    } catch (error) {
        res.status(500).json({ result: "error", message: error.message });
    }
}




export const updateProduct= async(req, res)=>{
    try {
        
        const pid= req.params.pid;
        const data= req.body;

        const updatedProduct= await productService.updateProduct(pid,data);
        res.json(updatedProduct)



    } catch (error) {
        res.status(500).json({ result: "error", message: error.message });
    }
}




export const deleteProduct= async(req, res)=>{
    try {
        const pid= req.params.pid;

        const deletedProduct= await productService.deleteProduct(pid);
        res.json(deletedProduct)
    } catch (error) {
        res.status(500).json({ result: "error", message: error.message });
    }
}

