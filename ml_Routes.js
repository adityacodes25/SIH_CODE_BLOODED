const express = require('express');
const router = express.Router();
const axios = require('axios');

const ML_SERVICE_URL = 'http://127.0.0.1:5001';

router.post('/predict-placement', async (req, res) => {
    try {
        const response = await axios.post(`${ML_SERVICE_URL}/predict`, req.body);
        return res.status(200).json(response.data);
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;