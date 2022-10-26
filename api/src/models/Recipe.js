const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id:{
      type: DataTypes.UUID, // de tipo alfa numerico
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4 // para que se genere automaticamente un id
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    summary:{
      type: DataTypes.TEXT,
      allowNull: false,
    },
    type:{
      type:DataTypes.STRING
    },
    healthScore:{
      type : DataTypes.FLOAT,
      validate : {
        min : 0 ,
        max : 100
      },
      defaultValue : 0
    },
    steps:{
      type:DataTypes.TEXT
    },
    image:{
      type:DataTypes.STRING
    },
    createdInDb: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  });
};
