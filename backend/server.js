require('dotenv').config();
const express = require('express')
const ConnectDB = require('./config/db.js')
const EscolaRoutes = require('./routes/EscolaRoutes.js')
const app = express();

const PORT = 3000;

app.use(express.json());

//Escola Routes
app.use('/escola', EscolaRoutes)


ConnectDB();

app.listen(PORT, ()=>{
    console.log(`Servidor Rodando em http://localhost:${PORT}`)
})

