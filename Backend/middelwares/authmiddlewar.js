const jwt = require('jsonwebtoken');
const SECRET_KEY = "silambu";

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "No token provided" });

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: "Token missing" });

  try {
    const decoded = jwt.verify(token,SECRET_KEY);
    req.user = decoded;
    res.json({msg:"token provided"})
    next();
  } catch (err) {
    res.status(401).json({ message:err.message});
  }
};


const isAdmin = (req, res, next) => {
  if (req.user.role !== 'staff') {
    return res.status(403).json({ message: "Admin access only" });
  }
  next();
};

const isAuth = (req,res,next) => {

  try {
    // Header-la irundhu token edukkrom
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "Token missing" });
    }

    // "Bearer token"
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Invalid token format" });
    }

    // Token verify
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "silambu");

    // 🔥 IMPORTANT: user info attach pannrom
    req.user = {
      id: decoded.id,
      role: decoded.role
    };
    console.log(decoded.id);
    console.log(decoded.role);


    next(); 
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};




module.exports={auth,isAuth,isAdmin}
