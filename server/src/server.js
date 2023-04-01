require("dotenv").config();
const express = require("express");
const connect = require("./Config/db");
const cors = require("cors");

const PORT = process.env.PORT || 8000;

const app = express();

const UserRoutes = require("./Operations/UserAuth/User.route");
const ProductRoutes = require("./Operations/Product/Product.route");
const CategoryRoutes = require("./Operations/category/category.route");

const AuthenticationMedilware = require("./Middleware/Authentication.Middleware");

app.use(cors({ origin: true, credentials: true }));

app.use(express.json());

app.use("/user", UserRoutes);
app.use(AuthenticationMedilware);
app.use("/product", ProductRoutes);
app.use("/category", CategoryRoutes);

app.listen(PORT || 8000, async () => {
  await connect();
  console.log(`running at http://localhost:${PORT}`);
});
