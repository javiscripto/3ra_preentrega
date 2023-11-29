import CartsMongo from "../DAO/classes/cartsClass.js";

const cartService = new CartsMongo()

const createCart=async(req, res)=>{
    const newCart= await cartService.createCart();
    res.json({result:"success", payload:newCart})
}


const getAll=async(req,res)=>{
    const carts= await cartService.getAll();
    res.json(carts)
}

const getById=async(req, res)=>{
    const cid = req.params.cid
    const cart = await cartService.getById(cid);
    const products=cart.products
    
    res.render("cart",{cart, products,cid})
}

const addProduct= async(req, res)=>{
    const cid= req.params.cid;
    const pid= req.params.pid;
    const result= await cartService.addProduct(cid,pid);
    res.json(result)
}

const deleteProduct= async (req, res)=>{
    const cid= req.params.cid;
    const pid= req.params.pid;

    const result= cartService.deleteProduct(cid,pid);
    res.json(result)
}

export default{createCart,getAll,getById,addProduct,deleteProduct}