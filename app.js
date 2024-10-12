// app.js
const express = require('express');
const connectDB = require('./config/db');
const urlRoutes = require('./routes/urlRoutes');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();
const PORT = process.env.PORT || 3000;


dotenv.config();

app.use(cors());

connectDB();

app.use(express.json());

app.use('/', urlRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
