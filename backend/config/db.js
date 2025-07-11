const mongoose = require('mongoose');

const ConnectDB = async () =>{
    const MONGO_URI = process.env.MONGO_URI;
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Conectado ao Mongo com sucesso!')
    } catch (error) {
        console.log('Erro ao conectar ao banco: ', error)
    }
}

module.exports = ConnectDB;