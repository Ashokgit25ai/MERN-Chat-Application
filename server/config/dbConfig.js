const mongoose = require("mongoose")


//Connection Logic
mongoose.connect(process.env.CONN_STR);

//Connection State
const db = mongoose.connection;


//Check DB Connection
db.on('connected', ()=>{
    console.log("DB Connection is Successful!");
});

db.on('error', (error)=>{
    console.log('DB Connection Failed!', error);
});

module.exports = db;