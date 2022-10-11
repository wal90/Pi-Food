const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('diet', {
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


  },{
    timestamps: false
  }
  );
};
