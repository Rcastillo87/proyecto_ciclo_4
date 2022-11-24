const { body } = require('express-validator/check');
const { check } = require('express-validator');

exports.validate = (method) => {
  switch (method) {
      case 'val_lista_users': {
      return [ 
         body('id').optional({ nullable: true, checkFalsy: true }).isInt().withMessage('Solo valores enteros')
         ]   
      }
      case 'val_crear_user': {
      return [ 
         body('nombre').isAlpha().withMessage('Solo valores de cadena'),
         body('correo').isEmail().withMessage('Solo se admiten correos'),
         body('celular').isInt().withMessage('Solo valores enteros'),
         body('pass').notEmpty().withMessage('Solo valores de cadena')
         ]   
      }
      case 'val_loguin': {
      return [ 
         body('correo').isEmail().withMessage('Solo se admiten correos'),
         body('pass').notEmpty().withMessage('Solo valores de cadena')
         ]   
      }
      case 'val_lista_ordenes': 
      {
      return [ 
         check('id').isInt().withMessage('Solo valores enteros').custom(async id => {
            const users = require('./apis/users/user_model');
            var user =  await users.findOne( { where: { id: id } } );
            if ( user === null ) {
               throw new Error('Email already registered')
            }
            })
            
         ]   
      }
      case 'val_crear_orden': {
         return [ 
            check('id').optional({ nullable: true, checkFalsy: true }).isInt().withMessage('Solo valores enteros'),
            check('fecha').isISO8601('yyyy-mm-dd').toDate().withMessage('Solo se permite fecha con el formato YYY-MM-DD'),
            check('hora').matches(/^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/gm).withMessage('Solo se permite horario con el formato 24H HH:MM'),
            check('ancho').isFloat().withMessage('Solo valores numericos'),
            check('alto').isFloat().withMessage('Solo valores numericos'),
            check('largo').isFloat().withMessage('Solo valores numericos'),
            check('peso').isFloat().withMessage('Solo valores numericos'),
            check('direccion').notEmpty().withMessage('Solo valores de cadena'),
            check('ciudad').notEmpty().withMessage('Solo valores de cadena'),
            check('nom_destinatario').notEmpty().withMessage('Solo valores de cadena'),
            check('cedula_destinatario').notEmpty().withMessage('Solo valores de cadena'),
            check('direccion_entrega').notEmpty().withMessage('Solo valores de cadena'),
            check('ciudad_entrega').notEmpty().withMessage('Solo valores de cadena'),
            check('id_user').isInt().withMessage('Solo valores enteros'),
            check( 'tipo' ).optional({ nullable: true, checkFalsy: true }).isIn(["Guardado", "Cancelado", "Cumplido"]).withMessage('Solo valores enteros entre 1 y 3')

         ]   
      }

  }
}