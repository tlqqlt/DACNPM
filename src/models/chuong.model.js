export default (sequelize, DataTypes) => {
  const Chuong = sequelize.define(
    'Chuong',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      tenChuong: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      idMonHoc: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      underscored: true,
    },
  );

  Chuong.associate = (models) => {
    Chuong.belongsTo(models.MonHoc, {
      foreignKey: 'idMonHoc',
      targetKey: 'id',
      OnDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
    Chuong.belongsToMany(models.CauHoi, {
      through: 'CauHoi_Chuong',
      as: 'CauHois',
      foreignKey: 'idChuong',
    });
  };

  return Chuong;
};
