const Product = require("../models/product.model");

exports.getAllProducts = (req, res, next) => {
  Product.find()
    .then((products) => res.status(200).json(products))
    .catch((error) => res.status(500).json({ error }));
};

exports.getOneProduct = (req, res, next) => {
  Product.findById(req.params.id)
    .then((product) => {
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.status(200).json(product);
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.createProduct = (req, res, next) => {
  const product = new Product({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    image: req.body.image,
    stock: req.body.stock
  });
  product
    .save()
    .then(() => res.status(201).json({ message: "Product created!" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.updateProduct = (req, res, next) => {
  const product = new Product({
    _id: req.params.id,
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    image: req.body.image,
    stock: req.body.stock
  });
  Product.updateOne({ _id: req.params.id }, product)
    .then(() => res.status(200).json({ message: "Product updated!" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.deleteProduct = (req, res, next) => {
  Product.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: "Product deleted!" }))
    .catch((error) => res.status(400).json({ error }));
};
