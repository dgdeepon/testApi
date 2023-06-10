
const express=require('express');
const app=express();
const cors=require('cors');
const db = require('./config/db');
const user = require('./routes/User.route');
const auth = require('./middleware/auth.middleware');


// cors
app.use(cors());

// json
app.use(express.json());

// auth
app.use('/user/logout',auth);

// login
app.use('/user',user);




app.listen(8080,async()=>{
    try {
        await db;
        console.log('db is connected');
    } catch (error) {
        console.log('failed to connect the db');
    }
    console.log('server port is 8080');
})