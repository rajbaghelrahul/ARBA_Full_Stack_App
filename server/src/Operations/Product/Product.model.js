
const mongoose = require("mongoose");


let productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
});


let ProductModel = mongoose.model("product", productSchema);


module.exports = ProductModel;