const mongoose = require('mongoose')
const { Schema } = mongoose;

const PostSchema = new Schema(
    {
        userId: {
            type: String,
            required: true
        },
        desc: {
            type: String,
        },
        likes: {
            type: Array,
            default: [],
        },
        image: {
            type: String,
        },
    },
    {timestamp: true,}
);

module.exports = mongoose.model("Post", PostSchema);
 
