import bcrypt from "bcrypt";

export const createHash=(password)=>{
    return bcrypt.hashSync(password,bcrypt.genSaltSync(10))
}
export const isValidPass=(user, password)=>{
   return bcrypt.compareSync(password,user.password)
}

//middleware que valida una sesion activa
export const activeSession=(req, res, next)=>{
    if(req.session.user){
       return next()
    }else{
      return  res.redirect("/api/sessions/login")
    }
}
//middleware que valida el rol para crear nuevos productos 
export const isAdmin=(req, res, next)=>{
    console.log(req.session)
   if(req.session.user.role!=="admin"){
    res.send("no tienes acceso ")
   }else{
    return next()
   }
   
}
//middleware valida rol para agregar productos al carrito
export const isUser=(req, res, next)=>{
    if(req.session.user.role!=="user"){
        res.send("solo los usuarios pueden realizar esta operacion")
    }else{
        console.log(req.session.user.email)
        return next()
    }
}
