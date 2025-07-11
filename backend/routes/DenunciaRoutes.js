const express = require('express')
const router = express.Router();
const DenunciaController = require('../controllers/DenunciaController.js')

router.post('/create', DenunciaController.DeninciaRegistrar)
router.post('/process', DenunciaController.DenunciaProcess)

module.exports= router