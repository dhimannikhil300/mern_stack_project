const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

const fileSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    imgUrl:{
        type:String,
    },
    tags:{
        type:String,
    },
    email:{
        type:String,
    } 
});

//POST MIDDLEWARE
fileSchema.post("save", async function(doc){
    try{
        console.log("Doc ", doc);

        //trapnsporter
        //TODO: shift this configuration under /config folder
        let trapnsporter = nodemailer.createTransport({
            host:process.env.MAIL_USER,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS,
            },
        });

        //send mail
        let info = await createTransport.sendMail({
            from:  `CodeHelp`,
            to: doc.email,
            subject:"New file uploaded on cloudinary",
            html:`<h2>Hello jee</h2><p>File Upload</p> 
            View Here : <a href="${doc.imageUrl}">${doc.imageUrl}</a>`,
        })
    }
    catch(error){
        console.log(error);
    }
})

const File = mongoose.model("File", fileSchema);
module.exports = File;