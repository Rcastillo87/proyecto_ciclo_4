module.exports = {
    lista_ordenes,
    crear_orden,
    actualizar_orden
};

async function lista_ordenes( data ) {
    const ordenes = require('./ordenes_model');
    return await ordenes.findAll( { where: { id_user: data.id } } );
} 

async function crear_orden( data ) {
    const ordenes = require('./ordenes_model');
    const user = require('../../apis/users/user_model');

    var existe = await user.findOne( { where: { id: data.id_user } } );
    if (existe === null) {
        return {error:"Data no encontrada"};
    }

    try {
        const resultadoCreate = await ordenes.create({
            fecha: data.fecha,
            hora: data.hora,
            ancho: data.ancho,
            alto: data.alto,
            largo: data.largo,
            peso: data.peso,
            direccion: data.direccion,
            ciudad: data.ciudad,
            nom_destinatario: data.nom_destinatario,
            cedula_destinatario: data.cedula_destinatario,
            direccion_entrega: data.direccion_entrega,
            ciudad_entrega: data.ciudad_entrega,
            id_user: data.id_user,
            tipo: data.tipo
        })
        console.log(resultadoCreate);
        return resultadoCreate;
    } catch (error) {
        console.log(error);
    }
} 

async function actualizar_orden( data ) {
    const ordenes = require('./ordenes_model');
    const user = require('../../apis/users/user_model');

    var existe = await user.findOne( { where: { id: data.id_user } } );
    if (existe === null) {
        return {error:"Data no encontrada user"};
    }

    var existe = await ordenes.findOne( { where: { id: data.id } } );
    if (existe === null) {
        return {error:"Data no encontrada orden"};
    }

    try {
        const resultadoCreate = await existe.update({
            id: data.id,
            fecha: data.fecha,
            hora: data.hora,
            ancho: data.ancho,
            alto: data.alto,
            largo: data.largo,
            peso: data.peso,
            direccion: data.direccion,
            ciudad: data.ciudad,
            nom_destinatario: data.nom_destinatario,
            cedula_destinatario: data.cedula_destinatario,
            direccion_entrega: data.direccion_entrega,
            ciudad_entrega: data.ciudad_entrega,
            id_user: data.id_user,
            tipo: data.tipo
        })
        await existe.save()
        console.log(resultadoCreate);
        return resultadoCreate;
    } catch (error) {
        console.log(error);
    }
} 


