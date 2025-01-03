import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs'
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

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
export const google = async (req, res, next) => {
    const { email, name, googlePhotoUrl } = req.body;
  
    try {
      if (!email || !name) {
        return res.status(400).json({ success: false, message: 'Missing required fields' });
      }
  
      const user = await User.findOne({ email });
  
      if (user) {
        const token = jwt.sign(
          { id: user._id, isAdmin: user.isAdmin },
          process.env.JWT_SECRET_KEY,
          { expiresIn: '1d' }
        );
  
        const { password, ...rest } = user._doc;
        return res
          .status(200)
          .cookie('access_token', token, { httpOnly: true, secure: true })
          .json(rest);
      }
  
      const generatedPassword = crypto.randomBytes(16).toString('hex');
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
  
      const newUser = new User({
        username: `${name.toLowerCase().replace(/\s/g, '')}${Math.random().toString(9).slice(-4)}`,
        email,
        password: hashedPassword,
        profilePicture: googlePhotoUrl || '',
      });
  
      await newUser.save();
  
      const token = jwt.sign(
        { id: newUser._id, isAdmin: newUser.isAdmin },
        process.env.JWT_SECRET_KEY,
        { expiresIn: '1d' }
      );
  
      const { password, ...rest } = newUser._doc;
      res
        .status(200)
        .cookie('access_token', token, { httpOnly: true, secure: true })
        .json(rest);
    } catch (error) {
      next(error);
    }
  };