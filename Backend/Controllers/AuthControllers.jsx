const UserModel = require('../Models/User_schema.jsx');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const signup = async (req,res)=>{
    try {
        const { name, email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (user) {
            return res.status(409)
                .json({ message: 'User already exist, you can login', success: false });
        }
        const userModel = new UserModel({ name, email, password });

        userModel.password = await bcrypt.hash(password,8);
        console.log(email);
        await userModel.save();

        res.status(201)
            .json({
                message: "Signup successfully",
                success: true
            })
    } catch (err) {
        res.status(500)
            .json({
                message: "Internal server errror",
                success: false
            })
    }
}

const login = async (req,res)=>{
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(403)
                .json({ message: 'Authentication failed! - Email not found', success: false });
        }
        const isPasswordEqual = await bcrypt.compare(password,user.password);
        if(!isPasswordEqual){
            return res.status(403)
                .json({ message: 'Authentication failed! - Incorrect password', success: false });
        }

        const jwToken = jwt.sign(
            {email: user.email , _id : user._id},
            process.env.JWT_SECRET,
            {expiresIn : '24h'}
        )

        res.status(200)
            .json({
                message: "Login successfully",
                success: true,
                jwToken,
                email,
                name : user.name
            })
    } catch (err) {
        res.status(500)
            .json({
                message: "Internal server errror",
                success: false
            })
    }
}

module.exports = {
    signup,
    login
}