const express = require("express");
const app = express.Router();

const { deleteCategoryByid, addCategory, updateCategory, getCategory, getSingleCategory, getCategoryByName } = require("./category.controller");

app.post('/add', addCategory)
app.patch("/update/:id",updateCategory)
app.get("/get",getCategory)
app.get("/get/:id",getSingleCategory)
app.get("/get/filtersort",getCategoryByName)
app.delete("/delete/:id",deleteCategoryByid)

module.exports = app;