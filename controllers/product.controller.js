const Product = require("../models/product.model.js");

exports.newProduct = async (req, res, next) => {
  const product = new Product(req.body);

  try {
    await product.save();
    res.json(product);
  } catch (error) {
    console.log(error);
    next();
  }
};

exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    console.log(error);
    next();
  }
};

exports.getProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.json("This product does not exist");
      next();
    } else {
      res.json(product);
    }
  } catch (error) {
    console.log(error);
    next();
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      {
        new: true,
      }
    );
    res.json(product);
  } catch (error) {
    console.log(error);
    next();
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete({ _id: req.params.id });
    res.json(product);
  } catch (error) {
    console.log(error);
    next();
  }
};