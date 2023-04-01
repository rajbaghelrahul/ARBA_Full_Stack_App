
const User = require('../UserAuth/User.model');
const ProductModel = require('./Product.model')
const jwt = require('jsonwebtoken');


exports.addProduct = async (req, res) => {
    let { title, description, price, category, image } = req.body;
    let { token } = req.headers;
    let decode = jwt.decode(token, process.env.JWT_SECRET);
    try {
        
        let user = await User.findOne({ email: decode.email });
        let createProd = await ProductModel.create({
            title,
            description,
            price,
            image,
            category,
            owner: user._id,
        });
        return res.status(200).send({ status: true, messege: "product added successfully" });

        

    } catch (error) {
        
        console.log(error);
        return res.status(404).send({ status: false, messege: "something went wrong" });
    }
}

exports.updateProduct = async (req, res) => {
    let data = req.body;
    let { id } = req.params;
    console.log(id)
    try {
        
        let updateProduct = await ProductModel.findByIdAndUpdate({ _id: id }, { ...data });
        return res.status(200).send({ status: true, messege: "product updated successfully" });

    } catch (error) {
        
        console.log(error);
        return res.status(404).send({ status: false, messege: "something went wrong" });
    }
}


exports.getProduct = async (req, res) => {
    try {
        let products = await ProductModel.find();
        return res.status(200).send({ status: true, messege: "Product fetched sucesfully", result: products });
    } catch (error) {
        return res.status(401).send({ status: false, messege: "something went wrong" });
    }
}

exports.getSingleProduct = async (req, res) => {
    let { id } = req.params;
    try {
        let product = await ProductModel.findById({ _id: id });
        return res.status(200).send({ status: true, messege: "Product fetched sucesfully", result: product });
    } catch (error) {
        return res.status(401).send({ status: false, messege: "something went wrong" });
    }
}


exports.deleteProductByid = async (req, res) => {
    let { id } = req.params;
    console.log(id)
    try {
        let prods = await ProductModel.findByIdAndDelete({ _id: id });
        return res.status(200).send({ status: true, messege: "product deleted successfully" });
    } catch (error) {
        console.log(error);
        return res.status(401).send({ status: false, messege: "something went wrong" });
    }
}