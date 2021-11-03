const express = require("express")
const app = express()
const db = require("./config/db")
__ = require("underscore");

app.use(express.json())

require("dotenv").config();
helper = require("./helper/helper"); //require here globli


let PORT = process.env.PORT || 5004 ;

//all routes
require("./routes/mainRoutes")(app);
app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`);
})