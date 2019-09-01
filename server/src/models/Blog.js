module.exports = (sequelize, DataTypes) =>
    sequelize.define('Blog', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
        title : DataTypes.STRING,
        body : DataTypes.TEXT
    })
