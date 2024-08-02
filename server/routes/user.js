import express from "express";
import { signup, login } from "../controllers/user.js";
import { body } from "express-validator";



const router = express.Router();

const validateSignUp = [
    body('email', "Incorrect Email").isEmail(),
    body('password', "Incorrect Password").isLength({ min: 5 }),
];
const validateLogin = [
    body('email', "Incorrect Email").isEmail(),
];


router.post("/signup", validateSignUp, signup);
router.post("/login", validateLogin, login);

export default router;

