const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.CONNECTION_STRING);
        console.log("Database connected succesfully");
    }
    catch (err) {
        console.log("DB Error", err);
        process.exit(1);
    }
}


module.exports = connectDB;