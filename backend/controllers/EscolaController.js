const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const Escola = require('../models/EscolaModel.js')

const EscolaRegister = async (req, res) =>{
    const {name, city, state, email, password, confirmpassword} = req.body

    //Simple Validations
    if(!email ||!city ||!state ||!name ||!password ||!confirmpassword){
        return res.status(422).json({msg:'Preencha todos os dados corretamente.'})
    }
    if(password != confirmpassword){
        return res.status(422).json({msg: 'Senhas não conferem.'})
    }

    const escola = await Escola.findOne({email: email})
    if(escola){
        return res.status(422).json({msg: 'Este email já foi usado, use outro.'})
    }

    const salt = await bcrypt.genSalt(12)
    const HashPassword = await bcrypt.hash(password,salt)

    const NovaEscola = await Escola.create({
        name,
        state,
        city,
        email,
        password: HashPassword
    })
    try {
        await NovaEscola.save();
        res.status(200).json({msg:`Escola ${name}, criada com sucesso.`})
    } catch (error) {
        res.status(500).json({msg:'Erro ao criar escola, tente novamente mais tarde.'})
    }
}

const EscolaLogin = async (req, res) =>{
    const {email, password} = req.body

    //Simple Validations
    if(!email || !password){
        return res.status(422).json({msg:'Preencha todos os dados corretamente.'})
    }
    
    const escola = await Escola.findOne({email: email})
    if(!escola){
        return res.status(404).json({msg: 'Escola com este email não encontrada.'})
    }

    const comparePassword = await bcrypt.compare(password, escola.password)

    if(!comparePassword){
        return res.status(500).json({msg: 'Senha Inválida.'})
    }
    const SECRET = process.env.SECRET
    const token = jwt.sign(escola.id, SECRET)
    res.status(200).json({msg:'Escola logada com sucesso: ', escola, token})
}

module.exports = {
    EscolaRegister,
    EscolaLogin
}