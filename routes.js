const express = require('express');
const app = express();
const auth = require('./config/auth');
var validador = require('./validador');

var user_controller = require('./apis/users/user_controller');
var ordenes_controller = require('./apis/ordenes/ordenes_controller');

/* GET home page. prueba*/
app.get('/', function(req, res, next) { res.render('index', { title: 'Express' }); });

app.get('/lista_users',  validador.validate('val_lista_users'), user_controller.lista_users);
app.post('/crear_user',  validador.validate('val_crear_user'),user_controller.crear_user);
app.post('/loguin', validador.validate('val_loguin'), user_controller.loguin);

//rutas autenticadas prueba
app.post("/welcome", auth, (req, res) => {
  res.status(200).send("Welcome 🙌 ");
});

//rutas autenticadas 
app.post("/lista_ordenes", auth, validador.validate('val_lista_ordenes'), ordenes_controller.lista_ordenes );
app.post("/crear_orden", auth, validador.validate('val_crear_orden'), ordenes_controller.crear_orden);


module.exports = app;