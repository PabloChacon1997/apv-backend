const checkAuth = (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    console.log("si tiene token con bearer");
  }
  const error = new Error("Token no valido o inexsistente");
  res.status(403).json({ msg: error.message });
  next();
};

export default checkAuth;
