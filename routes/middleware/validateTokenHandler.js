const jwt = require("jsonwebtoken");



const validateToken = (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
        return res.status(401).json({ message: "Not authorized, no token" });
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_KEY);
        req.user = decoded.id;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Not authorized, token failed" });
    }
}
module.exports = validateToken;
