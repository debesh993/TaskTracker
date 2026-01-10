// import jwt from "jsonwebtoken";
// import User from "../models/user.js";

// const authMiddleware = async (req, res, next) => {
//   try {
//     const token = req.cookies?.token;

//     if (!token) {
//       return res.status(401).json({
//         success: false,
//         message: "Not authenticated"
//       });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_KEY);

//     if (!decoded?.userId) {
//       return res.status(401).json({
//         success: false,
//         message: "Invalid token"
//       });
//     }

//     const user = await User.findById(decoded.userId).select("-password");

//     if (!user) {
//       return res.status(401).json({
//         success: false,
//         message: "User not found"
//       });
//     }

//     req.user = user;

//     next();
//   } catch (error) {
//     return res.status(401).json({
//       success: false,
//       message: "Authentication failed"
//     });
//   }
// };

// export default authMiddleware;
import jwt from "jsonwebtoken";
import User from "../models/user.js";

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Authorization token missing",
      });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token not provided",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_KEY);

    if (!decoded || !decoded.userId) {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    req.user = user;
    next();

  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Authentication failed",
    });
  }
};

export default authMiddleware;

