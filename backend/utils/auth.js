import jwt from "jsonwebtoken";

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
    return jwt.verify(token,'INDT20WC_290624')
}