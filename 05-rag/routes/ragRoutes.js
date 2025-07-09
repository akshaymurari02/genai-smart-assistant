const express = require('express');
const router = express.Router();
const { populateData, queryRag } = require('../controllers/ragController');

// Route to populate sample data
router.post('/populate', populateData);

// Route to handle RAG queries
router.post('/query', queryRag);

module.exports = router; 