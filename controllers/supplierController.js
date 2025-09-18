const Supplier = require('../models/Supplier');


// Trả về JSON nếu là API, render nếu là view
exports.index = async (req, res) => {
  const suppliers = await Supplier.find();
  const isApi = req.headers.accept && req.headers.accept.includes('application/json');
  if (isApi) {
    res.json(suppliers);
  } else {
    res.render('suppliers/index', { suppliers });
  }
};

exports.new = (req, res) => {
  res.render('suppliers/new');
};

exports.create = async (req, res) => {
  try {
    const supplier = await Supplier.create(req.body);
    const isApi = req.headers.accept && req.headers.accept.includes('application/json');
    if (isApi) {
      res.status(201).json(supplier);
    } else {
      res.redirect('/suppliers');
    }
  } catch (err) {
    console.error('Create supplier error:', err);
    res.status(400).json({ error: err.message });
  }
};

exports.edit = async (req, res) => {
  const supplier = await Supplier.findById(req.params.id);
  const isApi = req.headers.accept && req.headers.accept.includes('application/json');
  if (isApi) {
    if (!supplier) return res.status(404).json({ error: 'Not found' });
    res.json(supplier);
  } else {
    res.render('suppliers/edit', { supplier });
  }
};

exports.update = async (req, res) => {
  const supplier = await Supplier.findByIdAndUpdate(req.params.id, req.body, { new: true });
  const isApi = req.headers.accept && req.headers.accept.includes('application/json');
  if (isApi) {
    if (!supplier) return res.status(404).json({ error: 'Not found' });
    res.json(supplier);
  } else {
    res.redirect('/suppliers');
  }
};

exports.delete = async (req, res) => {
  const supplier = await Supplier.findByIdAndDelete(req.params.id);
  const isApi = req.headers.accept && req.headers.accept.includes('application/json');
  if (isApi) {
    if (!supplier) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted', supplier });
  } else {
    res.redirect('/suppliers');
  }
};