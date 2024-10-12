const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config()

mongoose.connection.on('connected', ()=>{
    console.log("Mongoose connected");
});
mongoose.connection.on('error', (err)=>{
    console.log("Mongoose connection error", err);
});
mongoose.connection.on('disconnected', ()=>{
    console.log("Mongoose disconnected");
});


async function dbConnect (){

    try {
        const db = await mongoose.connect(process.env.MONGO_DB_URL);
    } catch (error) {
        throw new Error(error.message||"Db connection failed");
    }

}

module.exports = dbConnect;
