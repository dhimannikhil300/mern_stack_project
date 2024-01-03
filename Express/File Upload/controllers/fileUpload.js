const { cloudinaryConnect } = require("../config/cloudinary");
const File = require("../models/File");
const cloudinary = require('cloudinary').v2;

//local fileUpload -> handler function
exports.localFileUpload = async(req, res) => {
    try{
        //fetch file
        const file = req.files.file;
        console.log("File is : ",file);
        let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`;
        console.log("Path : ", path);

        file.mv(path, (err) => {
            console.log(err);
        });

        res.json({
            success:true,
            message:'Local file upload Successfully',
        });
    }
    catch(error){
        console.log(error);
    }
}

function isFileTypeSupported(type, supportedTypes){
    return supportedTypes.includes(type);
}

async function uploadFileToCloudinary(file, folder){
    const option = {folder};
    await cloudinary.uploader.upload(file.tempFilePath, option);
}

//image upload
exports.imageUpload = async (req, res) => {
    try{
        //data fetch
        const {name, tags, email} = req.body;
        console.log(name, tags, email);

        const file = req.files.imageFile;   
        console.log(file);

        //validation
        const supportedTypes = ["jpg", "jpeg", "png"];
        const fileType = file.name.split('.')[1].toLowerCase();

        if(!isFileTypeSupported(file, supportedTypes)){
            return res.status(400).json({
                success:false,
                message:'File Type is not supported',
            })
        }

        //file format support 
        const response = await uploadFileToCloudinary(file, "Codehelp");

        //db me entry save krni h
        const fileData = await File.create({
            name, 
            tags, 
            email,
            imageUrl:res.secure_url,
        })

        res.json({
            success:true,
            imageUrl:res.secure_url,
            message:'Image is Succefully Upload'
        })
    }
    catch(error){
        console.log(error);
        res.status(400).json({
            success:false,
            message:"Someting went wrong",
        })
    }
}

//video upload
exports.videoUpload = async (req, res) => {
    try{
        //data fetch
        const {name, tags, email} = req.body;
        console.log(name, tags, email);

        const file = req.files.videoFile;

        //validation
        // const supportedTypes = ["mp4", ""];
        // const fileType = file.name.split('.')[1].toLowerCase();

        // if(!isFileTypeSupported(file, supportedTypes)){
        //     return res.status(400).json({
        //         success:false,
        //         message:'File Type is not supported',
        //     })
        // }
    }
    catch(error){
        res.status(400).json({
            success:false,
            massage:"Something went wrong",
        })
    }
}