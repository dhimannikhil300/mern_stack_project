const cloudinary = require('cloudinary').v2;

exports.cloudinaryConnect = () =>{
    try{
        cloudinary.config({
            // cloud_name: "dfa7lavjx",
            // api_key: "622931334538488",
            // api_secret: "ZN6BBSLzgn7VSID8HGiMNIkHvpA"
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.API_KEY,
            api_secret: process.env.API_SECRET,
          });
    }
    catch(error){

    }
}