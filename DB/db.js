const mongoose  = require("mongoose");

const connectDB = async ()=>{
    try {
        const username = process.env.DB_USERNAME;
        const password = process.env.DB_PASSWORD;
        const dbname = process.env.DB_NAME
        console.log(username,password,dbname)
        const  url = `mongodb+srv://${username}:${password}@cluster0.jxpil.mongodb.net/${dbname}?retryWrites=true&w=majority`;
     await mongoose.connect(url)
    } catch (error) {
        console.log(error)
    }
}
module.exports = connectDB;