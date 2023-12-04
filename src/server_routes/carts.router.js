import { Router } from "express";
import cartControler from "../server_controlers/cart.controler.js";
import { isUser,activeSession } from "../../utils.js";

const router= Router();

//create Cart
router.post("/",cartControler.createCart)

//get All
router.get("/",cartControler.getAll);

//get BY id
router.get("/:cid",cartControler.getById);

//add Product 
router.post("/:cid/products/:pid", isUser,cartControler.addProduct);

//delete Product
router.delete("/:cid/products/:pid", isUser,cartControler.deleteProduct);

//purchase cart
router.post("/:cid/purchase",cartControler.purchase);


export default router; 