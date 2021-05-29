export default (sequelize, DataTypes) => {
  const LopHP = sequelize.define(
    'LopHP',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      tenLopHP: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tenGiangVien: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      idMonHoc: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      hocKy: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      underscored: true,
    },
  );

  LopHP.associate = (models) => {
    LopHP.belongsTo(models.MonHoc, {
      foreignKey: 'idMonHoc',
      targetKey: 'id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
    LopHP.belongsTo(models.User, {
      foreignKey: 'tenGiangVien',
      targetKey: 'username',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
    LopHP.belongsToMany(models.User, {
      through: 'SV_LopHP',
      as: 'SVs',
      foreignKey: 'idLopHp',
    });
    LopHP.belongsToMany(models.KyThi, {
      through: 'LopHP_Kythi',
      as: 'KyThis',
      foreignKey: 'idLopHp',
    });
  };

  return LopHP;
};
