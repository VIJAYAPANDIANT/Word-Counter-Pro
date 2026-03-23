const express = require('express');
const router = express.Router();
const analysisController = require('../controllers/analysis.controller');

// Define the POST endpoint for text analysis
router.post('/analyze', analysisController.analyzeText);

module.exports = router;
