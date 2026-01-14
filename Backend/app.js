require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const { connectDB } = require('./DB/db');

app.use(cors());
app.use(express.json());

connectDB();

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/product', require('./routes/productrouter'));
app.use('/api/bill', require('./routes/billroutes'));
app.use('/api/dashboard', require('./routes/dashbordroutes'));

const PORT = process.env.PORT || 3000;


