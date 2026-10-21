const dotenv = require("dotenv");
const path = require("path");

dotenv.config({path: path.join(__dirname, ".env")})

require("./config/dbConfig");

const server =  require("./app")



const port = process.env.PORT_NUMBER || 3000;
server.listen(port,()=>{
    console.log("Listening from the port "+ port)
});