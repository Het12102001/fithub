const express = require('express');
const { addWeight, getWeights } = require('../controller/weight_Controller');
const router = express.Router();

router.post('/addWeight', addWeight);
router.get('/getWeights/:userId', getWeights);

module.exports = router;