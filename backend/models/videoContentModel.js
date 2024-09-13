const mongoose = require("mongoose");

const videoContentSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please add the title"],
    },
    description: {
        type: String,
        required: [true, "Please add Description"],
    },
    video: {
        type: String,
        required: [true, "Please add video"],
    }
},
    {
        timestamps: true
    }
)

module.exports = mongoose.model("videoContent", videoContentSchema);