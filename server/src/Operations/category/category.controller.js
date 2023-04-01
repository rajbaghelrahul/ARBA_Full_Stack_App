
const User = require('../UserAuth/User.model');
const jwt = require('jsonwebtoken');
const CategoryModel = require('./category.model');
require("dotenv").config();


exports.addCategory = async (req, res) => {
    
    let { name, slug, image } = req.body;
    
    let { token } = req.headers;

    let decode = jwt.decode(token, process.env.JWT_SECRET);
    try {
        
        let user = await User.findOne({ email: decode.email });
        
        let createCategory = await CategoryModel.create({
            name,
            slug,
            image,
            owner: user._id,
        });
        //
        return res.status(200).send({ status: true, messege: "category added successfully" });
    } catch (error) {
        //
        return res.status(401).send({ status: false, messege: "something went wrong" });
    }
}


exports.updateCategory = async (req, res) => {
    
    let data = req.body;
    
    let { id } = req.params;
    console.log(id);
    try {
        
        let updateCategory = await CategoryModel.findByIdAndUpdate({ _id: id }, { ...data });
        
        return res.status(200).send({ status: true, messege: "category updated successfully" });
    } catch (error) {
        
        console.log(error);
        return res.status(404).send({ status: false, messege: "something went wrong" });
    }
}
exports.getCategory = async (req, res) => {
    try {
        
        let category = await CategoryModel.find();
        
        return res.status(200).send({ status: true, messege: "Category fetched successfully", result: category });
    } catch (error) {
        
        return res.status(401).send({ status: false, messege: "something went wrong" });
    }
}

exports.getSingleCategory = async (req, res) => {
    let { id } = req.params;
    try {
        let category = await CategoryModel.findById({ _id: id });
        return res.status(200).send({ status: true, messege: "Category fetched sucesfully", result: category });
    } catch (error) {
        return res.status(401).send({ status: false, messege: "something went wrong" });
    }
}


exports.getCategoryByName = async (req, res) => {
    let { name } = req.query; 
        console.log(req.query);
    try {
        let category = await CategoryModel.find({ name }); 
        if (category.length === 0) { 
            return res.status(404).send({ status: false, messege: "Category not found" });
        } else if (category.length === 1) { 
            return res.status(200).send({ status: true, messege: "OK", result: category[0] });
        } else { 
            return res.status(200).send({ status: true, messege: "OK", result: category });
        }
    } catch (error) {
        return res.status(500).send({ status: false, messege: "Something went wrong" }); 
    }
}


exports.deleteCategoryByid = async (req, res) => {
    let { id } = req.params;
    try {
        let category = await CategoryModel.findByIdAndDelete({ _id: id }); 
        return res.status(200).send({ status: true, messege: "category deleted successfully" }); 
    } catch (error) {
        console.log(error);
        return res.send({ status: false, messege: "something went wrong" }); 
    }
}