import { Router } from "express";
import passport from "passport";
import initializePassport from "../config/passport.config.js";
import userModel from "../DAO/models/users.model.js";
import {getRegister,postRegister,failRegister,getLogin,postLogin, failLogin, githubLogin, gitHubCallback, logOut} from "../server_controlers/session.controler.js";



///set passport
initializePassport();
passport.serializeUser((user, done)=>{
    done(null, user.id)
})

passport.deserializeUser(async(id, done)=>{
    let user= await userModel.findById(id);
    done(null, user)
})

//////////////////////////////


const router = Router();







//register
router.get("/api/sessions/register",getRegister);

router.post("/api/sessions/register",passport.authenticate("register",{failureRedirect:"/failRegister"}), postRegister);

router.get("/failRegister", failRegister)





//login
router.get("/api/sessions/login", getLogin);

router.post("/api/sessions/login", passport.authenticate("login", { failureRedirect: "/faillogin" }), postLogin);

router.get("/faillogin", failLogin)



//login with github--------------------------
router.get("/api/sessions/github",passport.authenticate("github",{scope:["user:email"]}), githubLogin);
///github callback
router.get("/api/sessions/githubcallback",passport.authenticate("github", {failureRedirect:"/register"}) , gitHubCallback);
//------------------------


//logout
router.get("/logout", logOut)


export default router;
