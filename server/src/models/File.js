module.exports = (sequelize, DataTypes) =>
    sequelize.define('File', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
        //desc_title : DataTypes.STRING,
        //desc_body : DataTypes.TEXT,
        file_name : {
            type: DataTypes.STRING,
            unique: true,
            },
        file_path : DataTypes.STRING,
        file_size : DataTypes.STRING
    })