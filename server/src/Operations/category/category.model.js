
const mongoose = require("mongoose");


let categorySchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true 
    },
    slug: {
        type: String, 
        required: true 
    },
    image: {
        type: String, 
        required: true 
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "user" 
    },
});


let CategoryModel = mongoose.model("category", categorySchema);


module.exports = CategoryModel;