import Product, { find, findById, findOneAndUpdate, findByIdAndDelete } from "../models/product.model.js";

export async function newProduct(req, res, next) {
  const product = new Product(req.body);

  try {
    await product.save();
    res.json(product);
  } catch (error) {
    console.log(error);
    next();
  }
}

export async function getAllProducts(req, res, next) {
  try {
    const products = await find({});
    res.json(products);
  } catch (error) {
    console.log(error);
    next();
  }
}

export async function getProduct(req, res, next) {
  try {
    const product = await findById(req.params.id);
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
}

export async function updateProduct(req, res, next) {
  try {
    const product = await findOneAndUpdate(
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
}

export async function deleteProduct(req, res, next) {
  try {
    const product = await findByIdAndDelete({ _id: req.params.id });
    res.json(product);
  } catch (error) {
    console.log(error);
    next();
  }
}