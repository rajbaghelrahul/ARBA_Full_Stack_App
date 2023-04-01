
const express = require("express");
const app = express.Router();

const { addProduct, updateProduct, getProduct, getSingleProduct, deleteProductByid } = require('./Product.controller')

app.post('/add', addProduct)
app.patch("/update/:id",updateProduct)
app.get("/get",getProduct)
app.get("/get/:id",getSingleProduct)
app.delete("/delete/:id",deleteProductByid)

module.exports = app;