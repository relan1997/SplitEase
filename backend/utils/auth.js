import jwt from "jsonwebtoken";
import AppError from "./AppError.js";
import cookieParser from "cookie-parser";

export const setToken = (user) => {
  const payload = {
    username: user.username,
    iat: Math.floor(Date.now() / 1000), // Issued at time
    exp: Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60, // Expiration time (30 days)
  };
  const token = jwt.sign(payload,'INDT20WC_290624')
  return token;
};

export const getUser = (token)=>{
    try { 
      if(!token) throw new AppError("token not found",404)
      return jwt.verify(token,'INDT20WC_290624')
    } catch (error) {
      next(error);
    }    
}

export const verifyToken=(req,res,next)=>{
  try {
    const token = req.cookieParser.token;
    if(!token)
      throw new AppError("no token provided",401);
    const decoded=getUser(token);
    req.user=decoded
  } catch (error) {
    next(error)
  }
}