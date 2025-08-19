const cloudinary = require("cloudinary").v2

 // Configuration
    cloudinary.config({ 
        cloud_name:process.env.CLOUDNAME, 
        api_key: process.env.CLOUDINARY_APIKEY, 
        api_secret: process.env.CLOUDINARY_SECRETKEY
    });


    module.exports = cloudinary