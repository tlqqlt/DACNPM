export default (sequelize, DataTypes) => {
  const KyThi = sequelize.define(
    'KyThi',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      tenKyThi: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ngaythi: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      thoiluong: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      underscored: true,
    },
  );

  KyThi.associate = (models) => {
    KyThi.belongsToMany(models.LopHP, {
      through: 'LopHP_Kythi',
      as: 'LopHPs',
      foreignKey: 'idKyThi',
    });
    KyThi.belongsToMany(models.User, {
      through: 'SV_KyThi',
      as: 'Users',
      foreignKey: 'idKyThi',
    });
    KyThi.belongsToMany(models.DeThi, {
      through: 'DeThi_KyThi',
      as: 'DeThis',
      foreignKey: 'idKyThi',
    });
  };
  return KyThi;
};
