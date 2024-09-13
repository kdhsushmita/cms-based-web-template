const mongoose = require("mongoose");

const imagecontentSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please add the title"],
    },
    description: {
        type: String,
        required: [true, "Please add Description"],
    },
    image: {
        type: String,
        required: [true, "Please add image"],
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("ImageContent", imagecontentSchema);
