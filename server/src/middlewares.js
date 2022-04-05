const authAccount = (permission) => {
  return (req,res,next) => {
    const role = req.body.role
    if(permission.includes(role)){
      next();
    }
    else {
      return res.status(401).json("Você não tem permissão para isso")
    }
  }
};

module.exports = {authAccount};