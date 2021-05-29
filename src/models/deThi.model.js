export default (sequelize, DataTypes) => {
  const DeThi = sequelize.define(
    'DeThi',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      tenDeThi: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      nguoiTao: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      underscored: true,
    },
  );

  DeThi.associate = (models) => {
    DeThi.belongsTo(models.User, {
      foreignKey: 'nguoiTao',
      targetKey: 'username',
      OnDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
    DeThi.belongsToMany(models.CauHoi, {
      through: 'CauHoi_DeThi',
      as: 'CauHois',
      foreignKey: 'idDeThi',
    });
    DeThi.belongsToMany(models.KyThi, {
      through: 'DeThi_KyThi',
      as: 'KyThis',
      foreignKey: 'idDeThi',
    });
  };

  return DeThi;
};
