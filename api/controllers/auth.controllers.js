import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs'
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';
export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password || username === "" || email === "" || password === "") {
        next(errorHandler(400, "All fields are required"));

    }
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({
        username,
        email,
        password: hashedPassword
    });
    try {
        await newUser.save();
        res.json("signup successful");
    } catch (error) {
        next(error);
    }

}
export const signin = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password || email === "" || password === "") {
        next(errorHandler(400, "All fields are required"));
    }
    try {
        const validUser = await User.findOne({ email });
        // console.log(validUser);
        if (!validUser) {
            return next(errorHandler(404, "User Not Found"));
        }
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) {
            return next(errorHandler(400, "Invalid Password"));
        }
        
        // npm install jsonwebtoken
        const token = jwt.sign(
            { id: validUser._id, isAdmin: validUser._isAdmin }, process.env.JWT_SECRET_KEY);
            const {password:pass, ...rest} = validUser._doc;
            res
            .status(200)
            .cookie('access_token', token, {
              httpOnly: true,
            })
            .json(rest);
    } catch (error) {
        next(error)
    }
}