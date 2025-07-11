const mongoose = require('mongoose')

const DenunciaShema = new mongoose.Schema({
    title: {type: String, require: true},
    message: {type: String, require: true},
    status: {type: String, require: true},
    code: {type: String, require: true},
    id_escola: {type: mongoose.Schema.Types.ObjectId, ref:'Escola'},
    date: {type: Date, default: Date.now }
})

module.exports = new mongoose.model('Denuncia', DenunciaShema)