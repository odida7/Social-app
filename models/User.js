const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema(
    {
    firstname: {
        type: String,
        required: true
    },

    lastname: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        require: true 
    },

    isAdmin: {
        type: Boolean,
        default: false
    },

    profilePicture: {
      type: String,
      default: "",
    },

    coverPicture: {
      type: String,
      default: "",
    },

    followers: {
      type: Array,
      default: [],
    },
    followings: {
      type: Array,
      default: [],
    },
},
    {timestamps: true}
)

module.exports = mongoose.model("User", UserSchema);
