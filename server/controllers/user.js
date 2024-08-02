import UserMessage from "../models/User.js";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const jwtSecret = process.env.JWT_SECRET;
export const signup = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt)
    try {
        const result = await UserMessage.create({
            name: req.body.name,
            password: hashPassword,
            email: req.body.email,
            location: req.body.location
        });
        res.status(200).json({ success: true });  // Send the result back, not the model itself
    }
    catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }
}
export const login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const email = req.body.email;
    try {
        const userData = await UserMessage.findOne({ email });
        if (!userData) {
            return res.status(400).json({ errors: "Try Logging with correct credentails" });
        }
        const hashedPassword = await bcrypt.compare(req.body.password, userData.password);
        if (!hashedPassword) {
            return res.status(400).json({ errors: "Try Logging with correct Password" });
        }

        const data = {
            user: {
                id: userData.id,
            }
        }
        const authToken = jwt.sign(data, jwtSecret);
        return res.json({ success: true, authToken: authToken });
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }
}

