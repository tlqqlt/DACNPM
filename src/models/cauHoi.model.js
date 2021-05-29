export default (sequelize, DataTypes) => {
  const CauHoi = sequelize.define(
    'CauHoi',
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
      doKho: {
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

  CauHoi.associate = (models) => {
    CauHoi.belongsTo(models.User, {
      foreignKey: 'nguoiTao',
      targetKey: 'username',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
    CauHoi.hasMany(models.CauTraLoi, {
      foreignKey: 'idCauHoi',
      sourceKey: 'id',
      onDelete: 'CASCADE',
      OnUpdate: 'CASCADE',
    });
    CauHoi.belongsToMany(models.Chuong, {
      through: 'CauHoi_Chuong',
      as: 'Chuongs',
      foreignKey: 'idCauHoi',
    });
    CauHoi.belongsToMany(models.DeThi, {
      through: 'CauHoi_DeThi',
      as: 'DeThis',
      foreignKey: 'idCauHoi',
    });
  };

  return CauHoi;
};
