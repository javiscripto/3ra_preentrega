import passport from "passport";
import  { Strategy } from "passport-local";
import GitHubStrategy from "passport-github2";
import { createHash, isValidPass } from "../../utils.js";
import userModel from "../DAO/models/users.model.js";
import {cartModel} from "../DAO/models/carts.model.js";
import config from "../env_config/env_config.js"
const localStrategy = Strategy;

const initializePassport = () => {
  passport.use(
    "register",
    new localStrategy(
      { passReqToCallback: true, usernameField: "email" },
      async (req, username, password, done) => {
        try {
          let user = await userModel.findOne({ email: username });
          if (user) {
            console.log("usuario ya registrado");
            return done(null, false);
          } else {
            const cartUser= await cartModel.create({porducts:[]});
            console.log(cartUser)
            const newUser = {
              first_name: req.body.first_name,
              last_name: req.body.last_name,
              email: req.body.email,
              age: req.body.age,
              cart: cartUser._id
            };
            
            let saveUser;
            
            if (newUser.email == config.ADMIN_NAME && password == config.ADMIN_PASS) {
              saveUser = { ...newUser, role: "admin" };
            } else {
              saveUser = { ...newUser, role: "user" };
            }
            
            // Asigna la contraseña después de la asignación del rol
            saveUser = { ...saveUser, password: createHash(password) };
            
            let result = await userModel.create(saveUser);
            console.log("usuario registrado con exito",saveUser);
            return done(null, result);
          }
        } catch (error) {
          console.log("error al obtener usuario en bd", error);
          return done("error al obtener usuario", error);
        }
      }
    )
  );

  ////////////////////////// login
  passport.use(
    "login",
    new localStrategy(
      { usernameField: "email" },
      async (username, password, done) => {
        try {
          const user = await userModel.findOne({ email: username });

          if (!user) {
            console.log(`el usuario no existe`);
          }
          if (!isValidPass(user, password)) {
            return done(null, false);
          }
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  ///github strategy
  passport.use(
    "github",
    new GitHubStrategy(
      {
        clientID: "Iv1.37a3a1980a410dc9",
        clientSecret: "acfe9f654c71cbecf4954205ace49e1336bb40c9",
        callbackURL: "http://localhost:8080/api/sessions/githubcallback",
      },
      async (accesToken, refrechToken, profile, done) => {
        try {
          console.log(profile);
          let user = await userModel.findOne({ email: profile._json.email });
          if (!user) {

            const cartUser= await cartModel.create({porducts:[]});
            let newUser = {
              first_name: profile._json.name,
              last_name: "",
              age: 0,
              email: profile._json.email,
              password: "",
              cart:cartUser._id
            };
            let result = await userModel.create(newUser);
            return done(null, result);
          } else {
            done(null, user);
          }
        } catch (error) {
          return done(error);
        }
      }
    )
  );
};

export default initializePassport;