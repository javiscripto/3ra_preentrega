import { Router } from "express";
import{getAll, getById, createProduct,updateProduct,deleteProduct} from "../server_controlers/products.controler.js"
import{isAdmin,activeSession} from "../../utils.js"
const router= Router();



//get all 
router.get("/", activeSession, getAll);

//get by id 
router.get("/:pid",getById);





//////////////////////////// admin////////////////////////
//create product
//utiliza la ruta raiz para agregar productos. Al momento de agregar pasará por el middleware isAdmin

router.post("/",isAdmin,createProduct);

//update Porduct
router.put("/:pid",isAdmin, updateProduct);

//delete Poduct
router.delete("/:pid",isAdmin, deleteProduct)



export default router; 