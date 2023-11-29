import { Router } from "express";
import cartControler from "../server_controlers/cart.controler.js";

const router= Router();

//create Cart
router.post("/",cartControler.createCart)

//get All
router.get("/",cartControler.getAll);

//get BY id
router.get("/:cid",cartControler.getById);

//add Product 
router.post("/:cid/products/:pid",cartControler.addProduct);

//delete Product
router.delete("/:cid/products/:pid",cartControler.deleteProduct)


export default router; 