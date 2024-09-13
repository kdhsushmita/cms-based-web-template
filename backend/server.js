const cors = require("cors");

const express = require("express");
const path = require('path');
const dotenv = require("dotenv").config();
const connectDB = require("./config/dbConnection")

connectDB();

const app = express();

app.use(cors({
    origin: 'http://127.0.0.1:5501'
}));

const port = process.env.PORT || 5000;

app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use("/api/imagecontent", require("./routes/imagecontentRoutes"));
app.use("/api/videocontent", require("./routes/videocontentRoutes"));

app.listen(port, () => {
    console.log(`Server running on the port ${port}`);
})

