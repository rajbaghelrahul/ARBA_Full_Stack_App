
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true
    },
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    avatar: {
      type: String,
      default:"https://avatars.githubusercontent.com/u/97174581?v=4"
    }
  },  
  {    
    versionKey: false,    
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;