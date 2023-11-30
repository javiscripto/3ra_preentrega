import express,{json}from"express";
import mongoose from "mongoose";
import session from "express-session";
import config from "./env_config/env_config.js"
import MongoStore from "connect-mongo";



//seteo trabajo con rutas
import {fileURLToPath} from "url";
import path from "path";

const __filename=fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)





const app= express();

const port = config.PORT;

//const fileStorage = FileStore(session)



   

        //set session
app.use(session({
    store: MongoStore.create({
        mongoUrl:config.MONGO_URL,
        mongoOptions:{useNewUrlParser: true, useUnifiedTopology:true},
        ttl:60*60*10,//
    }),
    secret:"clave",
    resave: false,
    saveUninitialized:false,
    cookie:{
        name:"cookiename",
        secure:false,
        httpOnly:true,
        maxAge:1000*60*10,
       
       
    }
}));

//middlewares
app.use(json());
app.use(express.urlencoded({extended:true}));


//set public folder
app.use(express.static(path.join(__dirname, 'public')));



//import routes
import productRoute from "./server_routes/products.router.js"
import cartRoute from "./server_routes/carts.router.js"

//import messagesRoute from "./routes/messages.route.js";
import sessionRoute from "./server_routes/session.router.js"

app.use("/",sessionRoute)
app.use("/api/products",productRoute)
app.use("/api/carts", cartRoute)
//app.use("/", messagesRoute)

//handlebars
import handlebars from "express-handlebars"
import { engine } from "express-handlebars";
app.engine("handlebars", engine());
app.set("view engine","handlebars")
app.set("views",__dirname+`/views`);





//route add new product
// import {isAdmin} from "../utils.js"
//     //get
// app.get("/", isAdmin,(req, res)=>{
    
//     res.sendFile(path.join(__dirname,`public`,`index.html`))
// })


///////////////////////////////////  set mongoose conection

mongoose.connect(config.MONGO_URL,{ useNewUrlParser: true })
.then(()=>{
    console.log("conectado a la base de datos")
})
.catch(error=>{console.log("error al conectar ")})







app.listen(port,()=>{
    console.log(`server ok`)
})



