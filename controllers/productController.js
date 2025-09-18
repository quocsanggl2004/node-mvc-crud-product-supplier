const Product = require('../models/Product');
const Supplier = require('../models/Supplier');

exports.index = async (req, res) => {
  const products = await Product.find().populate('supplierId');
  const isApi = req.headers.accept && req.headers.accept.includes('application/json');
  if (isApi) {
    res.json(products);
  } else {
    res.render('products/index', { products });
  }
};

exports.new = async (req, res) => {
  const suppliers = await Supplier.find();
  res.render('products/new', { suppliers });
};

exports.create = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    const isApi = req.headers.accept && req.headers.accept.includes('application/json');
    if (isApi) {
      const populated = await Product.findById(product._id).populate('supplierId');
      res.status(201).json(populated);
    } else {
      res.redirect('/products');
    }
  } catch (err) {
    console.error('Create product error:', err);
    res.status(400).json({ error: err.message });
  }
};

exports.edit = async (req, res) => {
  const product = await Product.findById(req.params.id).populate('supplierId');
  const suppliers = await Supplier.find();
  const isApi = req.headers.accept && req.headers.accept.includes('application/json');
  if (isApi) {
    if (!product) return res.status(404).json({ error: 'Not found' });
    res.json(product);
  } else {
    res.render('products/edit', { product, suppliers });
  }
};

exports.update = async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('supplierId');
  const isApi = req.headers.accept && req.headers.accept.includes('application/json');
  if (isApi) {
    if (!product) return res.status(404).json({ error: 'Not found' });
    res.json(product);
  } else {
    res.redirect('/products');
  }
};

exports.delete = async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  const isApi = req.headers.accept && req.headers.accept.includes('application/json');
  if (isApi) {
    if (!product) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted', product });
  } else {
    res.redirect('/products');
  }
};
