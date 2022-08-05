const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  sequelize.define('Formato', {
    tipo: {
      type: DataTypes.ENUM('FISICO', 'EBOOK', 'AUDIOLIBRO'),
      allowNull: false,
    },
  })
}
