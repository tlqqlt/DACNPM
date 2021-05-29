export default (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      username: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      hovaten: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      sodienthoai: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      idKhoa: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      underscored: true,
    },
  );

  User.associate = (models) => {
    User.belongsTo(models.Khoa, {
      foreignKey: 'idKhoa',
      targetKey: 'id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
    User.hasOne(models.LopHP, {
      foreignKey: 'tenGiangVien',
      sourceKey: 'username',
      OnDelete: 'CASCADE',
      OnUpdate: 'CASCADE',
    });
    User.belongsToMany(models.LopHP, {
      through: 'SV_LopHP',
      as: 'LopHPs',
      foreignKey: 'idUser',
    });
    User.belongsToMany(models.KyThi, {
      through: 'SV_KyThi',
      as: 'KyThis',
      foreignKey: 'idUser',
    });
    User.hasOne(models.DeThi, {
      foreignKey: 'nguoiTao',
      sourceKey: 'username',
      OnDelete: 'CASCADE',
      OnUpdate: 'CASCADE',
    });
    User.hasOne(models.CauHoi, {
      foreignKey: 'nguoiTao',
      sourceKey: 'username',
      OnDelete: 'CASCADE',
      OnUpdate: 'CASCADE',
    });
  };

  return User;
};
