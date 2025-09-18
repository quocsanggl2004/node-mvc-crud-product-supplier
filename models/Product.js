const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  quantity: Number,
  supplierId: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier' }
});
module.exports = mongoose.model('Product', productSchema);