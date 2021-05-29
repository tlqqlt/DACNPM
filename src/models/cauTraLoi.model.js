export default (sequelize, DataTypes) => {
  const CauTraLoi = sequelize.define(
    'CauTraLoi',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      noiDung: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      idCauHoi: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      isTrue: {
        type: DataTypes.BOOLEAN,
      },
    },
    {
      underscored: true,
    },
  );

  CauTraLoi.associate = (models) => {
    CauTraLoi.belongsTo(models.CauHoi, {
      foreignKey: 'idCauHoi',
      targetKey: 'id',
      OnDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };

  return CauTraLoi;
};
