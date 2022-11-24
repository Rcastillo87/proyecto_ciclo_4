const users = require('./user_service');
const { validationResult } = require('express-validator/check');

function lista_users(req, res, next) {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }

    if( (req.body.id === '') || (typeof req.body.id === 'undefined')){
        users.lista_users( )
            .then( (respuerta)=> {
                return res.send(respuerta);
            }
        ).catch(next);
    }else{
        users.uno_user( req.body )
            .then( (respuerta)=> {
                return res.send(respuerta);
            }
        ).catch(next);
    }
}

function crear_user(req, res, next) {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }

    users.crear_user( req.body  )
        .then( (respuerta )=> {
            return res.send(respuerta);
        }
    ).catch(next);
}

function loguin(req, res, next) {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }

    users.loguin( req.body  )
        .then( (respuerta )=> {
            return res.send(respuerta);
        }
    ).catch(next);
}


module.exports = {
    lista_users,
    crear_user,
    loguin
};

