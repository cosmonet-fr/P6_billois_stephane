console.log("run routes/sauces.js");
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const sauceCtrl = require('../controllers/sauces.js')


router.post('/', auth, sauceCtrl.createSauce);

module.exports = router;
