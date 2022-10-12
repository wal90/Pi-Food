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
    healthScore:{
      type : DataTypes.FLOAT,
      validate : {
        min : 0 ,
        max : 100
      },
      defaultValue : 0
    },
    steps:{
      type: DataTypes.ARRAY(DataTypes.JSON)
    },
    image:{
      type:DataTypes.STRING,
      defaultValue:("https://heartstrokeprod.azureedge.net/-/media/images/articles/foodguideplatev2.ashx?rev=372b23652cd243f98bef2cca920a6fd4&bc=f7f7f7&w=1160&h=653&as=1&la=en&hash=32388F46CEA12E28FA9E7F05FE09110A")
    },
    createdInDb: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  });
};
