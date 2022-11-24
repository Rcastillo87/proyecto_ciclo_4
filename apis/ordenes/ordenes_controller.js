const orden = require('./ordenes_service');
const { validationResult } = require('express-validator/check');
const validador = require('../../validador');

function lista_ordenes(req, res, next) {

    const errors = validationResult( req );
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }

    orden.lista_ordenes(  req.body )
        .then( (respuerta)=> {
            return res.send(respuerta);
        }
    ).catch(next);
}

function crear_orden(req, res, next) {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }

    if( (req.body.id === '') || (typeof req.body.id === 'undefined')){
        orden.crear_orden( req.body  )
            .then( (respuerta )=> {
                return res.send(respuerta);
            }
        ).catch(next);
    }else{
        orden.actualizar_orden( req.body  )
            .then( (respuerta )=> {
                return res.send(respuerta);
            }
        ).catch(next);
    }

}

module.exports = {
    lista_ordenes,
    crear_orden
};

