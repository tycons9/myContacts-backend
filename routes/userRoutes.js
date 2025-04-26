const express = require('express');
const jwt = require('jsonwebtoken');
const {
    registerUser,
    loginUser,
    currentuser
} = require('../controllers/userController');
const router = express.Router();

// Define the validateToken middleware before using it
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
};

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/current', validateToken, currentuser);

module.exports = router;
