const ClienteModelo = require("../modelos/ClienteModelo");
const bcrypt = require("bcrypt");
const LoginOperaciones = {};
/*const jwt = require("jsonwebtoken");
const SECRET_KEY = "C4ndyCru5h#Dulc30nl1n3"; 
const EXPIRE_TIME = "10m"; 
*/

const compararPassw = async (recibido, guardado) => {
    return await bcrypt.compare(recibido, guardado);
}

/*
const generarToken = (id, nombres, es_admin) => {
    return jwt.sign({id: id, nombres: nombres, es_admin: es_admin}, SECRET_KEY, {expiresIn: EXPIRE_TIME});
}

const verificarToken = (token) => {
    try {
        return jwt.verify(token, SECRET_KEY);    
    } catch (error) {
        return null;
    }
}
*/
LoginOperaciones.login = async(req, res) => {
    try {
        const email = req.body.email;
        let passw = req.body.passw;
        const usuario = await ClienteModelo.findOne({email: email});
        if (usuario != null) {
            const result = await compararPassw(passw, usuario.passw);
            if (result) {
                const acceso = {
                    nombres: usuario.nombres+" "+usuario.apellidos,
                    es_admin: usuario.es_admin,
                    //token: generarToken(usuario.id, usuario.nombres+" "+usuario.apellidos, usuario.es_admin)
                }
                res.status(200).json(acceso);
            }
            else {
                res.status(401).send("Email o contraseña incorrectos");    
            }
        }
        else {
            res.status(401).send("Email o contraseña incorrectos");
        }
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
}

/*LoginOperaciones.autorizar = async (req, res) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        const data = verificarToken(token);
        if (data != null) {
            res.status(202).send("Aceptado");
        }
        else {
            res.status(403).send("No autorizado");
        }
    }
    else {
        res.status(403).send("No autorizado");
    }
}
*/
module.exports = LoginOperaciones;
 