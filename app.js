require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const app = express();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));


app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json()); // Cho phép nhận body JSON
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

const supplierRoutes = require('./routes/supplierRoutes');
const productRoutes = require('./routes/productRoutes');
app.use('/suppliers', supplierRoutes);
app.use('/products', productRoutes);

app.get('/', (req, res) => {
  res.redirect('/suppliers');
});

app.listen(3000, () => console.log('Server started: http://localhost:3000/'));