const express = require('express');
const router = express.Router();
const { generateBuild } = require('../controllers/buildController');

router
    .route('/')
    .post(generateBuild);

module.exports = router