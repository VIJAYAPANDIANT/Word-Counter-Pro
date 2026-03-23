const express = require('express');
const cors = require('cors');
require('dotenv').config();

const analysisRoutes = require('./src/routes/analysis.routes');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Routes
app.use('/api', analysisRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
