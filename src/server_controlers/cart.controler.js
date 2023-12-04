import CartsMongo from "../DAO/classes/cartsClass.js";
import { TicketMongo } from "../DAO/classes/ticketClass.js";

const cartService = new CartsMongo();
const ticketService= new TicketMongo();

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
    
    const products= cart.products
    //
    console.log("info de sessions")
    console.log(req.session)
    res.render("cart",{products,cid})
}

const addProduct= async(req, res)=>{
    const cid= req.params.cid;
    const pid= req.params.pid;
    const quantity= Number(req.body.quantity)
    const result= await cartService.addProduct(cid,pid,quantity);
    res.json(result)
}

const deleteProduct= async (req, res)=>{
    const cid= req.params.cid;
    const pid= req.params.pid;

    const result= cartService.deleteProduct(cid,pid);
    res.json(result)
}

const purchase= async(req, res)=>{
    const cid=req.params.cid;
    const cart= await cartService.getById(cid);
    const products= cart.products
   
    let amount=0;
    products.forEach(prod=>{
        amount+=prod.item.price*prod.quantity
    })
    console.log(req.session)
    res.json(amount)
    
}

export default{createCart,getAll,getById,addProduct,deleteProduct, purchase}