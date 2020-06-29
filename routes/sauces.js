console.log("run routes/sauces.js");
const express = require('express');
const router = express.Router();

const sauceCtrl = require('../controllers/sauces.js')


router.post('/', sauceCtrl.createSauce);

module.exports = router;
