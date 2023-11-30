import { Router } from "express";
import cartControler from "../server_controlers/cart.controler.js";
import { isUser } from "../../utils.js";

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
router.delete("/:cid/products/:pid", isUser,cartControler.deleteProduct)


export default router; 