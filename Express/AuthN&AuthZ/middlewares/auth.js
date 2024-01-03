
// auth, isStudent, isAdmin

const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = (req, res, next) =>{
    try{
        //exttract jwt token
        // const token = req.body.token || req.cookies.token || req.header("Authorization").replace("Bearer ","");
        const token = req.body.token;
        //one more way to fetch token : Pending

        if(!token || token === undefined){
            return res.status(401).json({
                success:true,
                message:"Token Missing",
            });
        }

        try{
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decode);

            req.user = decode;
        }
        catch(error){
            return res.status(401).json({
                success:false,
                message:'token is invalid',
            });
        }

        next();
    } 
    catch(error){
        return res.status(401).json({
            success:false,
            message:'Something want is wrong, while verifying the token',
        });
    }
}

exports.isStudent = (req, res) => {
    try{
        if(req.user.role !== "Student"){
            return res.status(401).json({
                success:false,
                message:"This is Protect route for student",
            });
        }
        next();
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:'User Role is not Matching',
        });
    }
}

exports.isAdmin = (req, res) => {
    try{
        if(req.user.role !== "Admin"){
            return res.status(401).json({
                success:false,
                message:"This is Protect route for student",
            });
        }
        next();
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:'User Role is not Matching',
        });
    }
}