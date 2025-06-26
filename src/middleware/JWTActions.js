import jwt from "jsonwebtoken";
require("dotenv").config();
const nonSecurePaths = ["/", "/login", "/register"];

const createJWT = (payload) => {
  let key = process.env.JWT_SECRET;
  let token = null;
  try {
    token = jwt.sign(payload, key, { expiresIn: process.env.JWT_EXPIRES_IN });
  } catch (err) {
    console.log("[11:22 PM +07, 26/06/2025] Error in createJWT:", err);
  }
  return token;
};

const verifyToken = (token) => {
  let key = process.env.JWT_SECRET;
  let decoded = null;
  try {
    decoded = jwt.verify(token, key);
  } catch (err) {
    console.log("[11:22 PM +07, 26/06/2025] Error in verifyToken:", err);
  }
  return decoded;
};

const checkUserJWT = (req, res, next) => {
  if (nonSecurePaths.includes(req.path)) {
    console.log("[11:22 PM +07, 26/06/2025] Skipping JWT check for:", req.path);
    return next(); // Miễn trừ các path không cần JWT
  }
  let cookies = req.cookies;
  console.log("[11:22 PM +07, 26/06/2025] Cookies:", cookies);
  if (cookies && cookies.jwt) {
    let token = cookies.jwt;
    let decoded = verifyToken(token);
    if (decoded) {
      req.user = decoded;
      next();
    } else {
      return res.status(401).json({
        EC: -1,
        DT: "",
        EM: "Not authenticated",
      });
    }
    console.log("[11:22 PM +07, 26/06/2025] my jwt:", cookies.jwt);
  } else {
    return res.status(401).json({
      EC: -1,
      DT: "",
      EM: "Not authenticated",
    });
  }
};

const checkUserPerMission = (req, res, next) => {
  if (nonSecurePaths.includes(req.path)) {
    console.log(
      "[11:22 PM +07, 26/06/2025] Skipping permission check for:",
      req.path
    );
    return next(); // Miễn trừ các path không cần quyền
  }
  if (req.user) {
    let email = req.user.email;
    let roles = req.user.data || [];
    console.log("[11:22 PM +07, 26/06/2025] check data roles:", roles);
    let currentUrl = req.path;

    if (!roles || roles.length === 0) {
      return res.status(403).json({
        EC: -1,
        DT: "",
        EM: "You dont have permission to access this resource",
      });
    }
    let canAccess = roles.some((item) => item.url === currentUrl);
    if (canAccess === true) {
      next();
    } else {
      return res.status(403).json({
        EC: -1,
        DT: "",
        EM: "You dont have permission to access this resource",
      });
    }
  } else {
    return res.status(401).json({
      EC: -1,
      DT: "",
      EM: "Not authenticated",
    });
  }
};

module.exports = {
  createJWT,
  verifyToken,
  checkUserJWT,
  checkUserPerMission,
};
