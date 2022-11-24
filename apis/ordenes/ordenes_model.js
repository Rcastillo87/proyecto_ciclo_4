// models/user.js
const sequelize = require('../../config/bd');
const { DataTypes } = require("sequelize");
const User = require('../../apis/users/user_model');

const Ordenes = sequelize.define("ordenes", {
  id_user: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  hora: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  ancho: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  alto: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  largo: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  peso: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  direccion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ciudad: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nom_destinatario: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cedula_destinatario: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  direccion_entrega: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ciudad_entrega: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tipo: {
    type: DataTypes.ENUM("Guardado", "Cancelado", "Cumplido"),
    defaultValue: "Guardado",
  }
});

module.exports = Ordenes;


