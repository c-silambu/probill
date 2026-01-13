require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const { connectDB } = require('./DB/db');

app.use(cors());
app.use(express.json());

connectDB();

app.use('/auth', require('./routes/authRoutes'));
app.use('/product', require('./routes/productrouter'));
app.use('/bill', require('./routes/billroutes'));
app.use('/dashboard', require('./routes/dashbordroutes'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
