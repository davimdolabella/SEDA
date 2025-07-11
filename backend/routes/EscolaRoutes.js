const express = require('express')
const router = express.Router();
const EscolaController = require('../controllers/EscolaController.js')

router.post('/register', EscolaController.EscolaRegister)
router.post('/login', EscolaController.EscolaLogin)

module.exports = router;