const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const User = require("../models/User");
const { options } = require("../routes/user");
require('dotenv').config();

//signup route handlre
exports.signup = async(req, res) => {
    try{
        //get data
        const {name, email, password, role} = req.body;
        //check if user already exist
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                success:false,
                message:'User already Exists',
            });
        }

        //secure password
        let hashedPassword;
        try{
            // console.log("Your password is : ", password, " and ", hashedPassword)
            hashedPassword = await bcrypt.hash(password, 10);
            // console.log("Your password is : ", password, " and ", hashedPassword)
        }
        catch(error){
            return res.status(500).json({
                success:false,
                message:'error in hasing Password',
            });
        }

        //create entry for user
        const user = await User.create({
            name, email, password:hashedPassword, role
        })

        return res.status(200).json({
            success:true,
            message:'User created successfully',
        })
    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message:'User cannot be regiser, Please Try again later',
        })
    }
}

//login
exports.login = async (req, res) =>{
    try{
        //data fetch
        const {email, password} = req.body;

        //validation on email and password
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:'Please fill all the details carefully',
            });
        }

        //check for registered user
        const user = await User.findOne({email});
        //if not registerd User
        if(!user){
            return res.status(401).json({
                success:false,
                message:'User is not regiseter',
            });
        }

        const payload = {
            email:user.email,
            id:user._id,
            role:user.role,
        }

        //verify password
        if(await bcrypt.compare(password, user.password)){
            //password match
            let token = jwt.sign(payload, 
                                        process.env.JWT_SECRET,
                                        {
                                            expiresIN:"2h",
                                        });

                // user = user.toObject();
                user.token = token;
                user.password = undefined;
                
                const options = {
                    expires:new Date(Date.now() + 3*24*60*60*1000),
                    httpOnly:true,
                }
                res.cookie("token", token, options).status(200).json({
                    success:true,
                    token,
                    user,
                    message:'user logged in successfully',
                });
        }
        else{
            //password do not match
            return res.status(403).json({
                success:false,
                message:'Please enter correct password',
            })
        }
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'Login Failure',
        });
    }
}