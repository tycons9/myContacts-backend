const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            throw new Error("Username, email, and password are required");
        }

        const userExists = await User.findOne({ email });

        if (userExists) {
            throw new Error("User already exists with this email");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            username,
            email,
            password: hashedPassword
        });

        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            }
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            throw new Error("Email and password are required");
        }

        const user = await User.findOne({ email });
        if (!user) {
            throw new Error("Invalid email or password");
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error("Invalid email or password");
        }

        // Generate JWT
        const token = jwt.sign(
            { id: user._id },
            process.env.ACCESS_KEY,  // Make sure to create a .env file with JWT_SECRET
            { expiresIn: "15m" }
        );

        res.json({
            message: "User logged in successfully",
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};

const currentuser = async (req, res) => {
    try {
        // Simulate authenticated user (later you can get from token/session)
        const user = {
            id: 1,
            name: "Eyob",
            email: "eyob@gmail.com"
        };

        res.json({
            message: "Current user information",
            user
        });
    } catch (error) {
        res.status(500).json({ error: "Something went wrong" });
    }
};

module.exports = { registerUser, loginUser, currentuser };
