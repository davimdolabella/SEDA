const jwt = require('jsonwebtoken')
const Denuncia = require('../models/DenunciaModel.js')
const Escola = require('../models/EscolaModel.js')
const crypto = require('crypto')

const DeninciaRegistrar = async (req, res) =>{
    const {title, message, escolaname, escolastate, escolacity} = req.body;
    // Simple Validation 
    if(!title||!message||!escolaname||!escolastate||!escolacity){
        return res.status(422).json({msg: 'Preencha todos os dados corretamente.'})
    }

    const escola = await Escola.findOne({
        name: escolaname,
        city: escolacity,
        state: escolastate
    })

    if(!escola){
        return res.status(404).json({msg: 'Erro ao encontrar escola, tente novamente.'})
    }

    const escolaid = escola.id

    let code;
    let existe;

    do {
        code = crypto.randomBytes(6).toString('hex');
        existe = await Denuncia.findOne({ code });
    } while (existe);

    const NovaDenuncia = await Denuncia.create({
        title: title,
        message: message,
        id_escola: escolaid,
        code: code
    })

    try {
        await NovaDenuncia.save();
        res.status(200).json({msg: 'Denúncia criada com sucesso!', code})
    } catch (error) {
        res.status(500).json({msg: 'Erro ao criar denúncia, tente novamente mais tarde.'})
    }

}

const DenunciaProcess = async (req, res)=>{
    const {code} = req.body
    //Simple Validation
    if(!code){
        return res.status(422).json({msg: 'Preencha o campo corretamente.'})
    }

    const denuncia = await Denuncia.findOne({code: code}, '-code')

    if(!denuncia){
        return res.status(404).json({msg: 'Erro ao encontrar denúncia.'})
    }
    const SECRET = process.env.SECRET;
    const token = jwt.sign(denuncia.id, SECRET)
    res.status(200).json({msg: 'Denúncia encontrada com sucesso!', denuncia, token})
}

module.exports = {
    DeninciaRegistrar,
    DenunciaProcess
}