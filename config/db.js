const mongoose=require('mongoose');
require('dotenv').config();


const db=mongoose.connect(process.env.atlas_URL);


module.exports=db;