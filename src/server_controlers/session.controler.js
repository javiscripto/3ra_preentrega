



// register 
export const getRegister=(req, res)=>{
    res.render("register")
};


export const postRegister=(req, res)=>{
    res.send({status: "success", message:"usuario registrado"})

}

export const failRegister=(req, res)=>{
    console.log(`falla en el registro`)
    res.send({error:"fallo el registro"})
}



//login
export const getLogin=(req, res)=>{
    res.render("login")
}


export const postLogin=(req, res)=>{
    if (!req.user) return res.status(400).send({ status: "error", error: "credencial invalida" })


    const user= req.user;
    req.session.user=user; 
    
    
    res.redirect("/api/products")
};





export const failLogin=(req, res)=>{
    res.send("algo fallo")
}

//login with github
export const githubLogin=(req, res)=>{

};

export const gitHubCallback=(req, res)=>{
    req.session.user=req.user;
    res.redirect("/api/products")
}

export const logOut=(req, res)=>{
    req.session.destroy(err=>{
        if(!err)res.redirect("/api/sessions/login")
        else res.send({status:`logout error`, body: err})
    })
}




