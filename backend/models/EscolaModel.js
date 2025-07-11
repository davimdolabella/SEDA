const mongoose = require('mongoose')

const EscolaSchema = new mongoose.Schema({
    name: {type: String, require: true},
    state: {type: String, require: true},
    city: {type: String, require: true},
    email: {type: String, require: true},
    password: {type: String, require: true}
})

module.exports = new mongoose.model('Escola', EscolaSchema)