


const authorize = (allowedRoles) => {
  return (req, res, next) => {
    // Verifica si el usuario actual está autenticado

    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Verifica si el rol del usuario actual está permitido

    const userRole = req.session.user.role; 
  
    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({ message: "Forbidden" });
    }

    

    next();
  };
};
export default authorize