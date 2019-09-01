module.exports = (sequelize, DataTypes) =>
    sequelize.define('Version', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
        manufacturer : DataTypes.STRING,
        model : DataTypes.STRING,
        type : DataTypes.STRING,
        unit : DataTypes.STRING,
        ltsVersion : DataTypes.STRING,
        latestVersion : DataTypes.STRING,
        history : DataTypes.TEXT
    })