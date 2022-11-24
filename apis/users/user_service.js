const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");


module.exports = {
    lista_users,
    crear_user,
    loguin,
    uno_user
};

async function lista_users(  ) {
    const users = require('./user_model');
    return await users.findAll({
        attributes: {exclude: ['pass']}
    });
} 

async function uno_user(  data ) {
    const users = require('./user_model');
    return await  users.findAll( {attributes: {exclude: ['pass']}},  { where: { id: data.id } } );
} 

async function crear_user( data ) {
    const users = require('./user_model');
    const salt = await bcrypt.genSalt(10);
    pass = await bcrypt.hash(data.pass, salt);

    try {
        const resultadoCreate = await users.create({
            nombre: data.nombre,
            correo: data.correo,
            celular: data.celular,
            pass: pass
        })
        console.log(resultadoCreate);
        return resultadoCreate;
    } catch (error) {
        console.log(error);
    }
} 

async function loguin( data ) {
    const users = require('./user_model');
    user = await users.findOne(  { where: { correo: data.correo }});
    try {   
        if ( ! user ) {
            return { message: "No Logeado", error: "User no encontrado",}
        }else {
            
            if (user && (await bcrypt.compare(data.pass, user.pass))) {
                // Create token
                const token = jwt.sign(
                  { user_id: user.id, user },
                  "hola",
                  {
                    expiresIn: "2h",
                  }
                );
          
                // save user token
                user.token = token;
                user.pass = null;

            return {message: "Login Exitoso", user,}
            }else{
                return { message: "No Logeado", error: "Pass no valido",}
            }
        }
    } catch (error) {
        return { message: "Ha occurrido un error", error: error.message,}
    }
} 