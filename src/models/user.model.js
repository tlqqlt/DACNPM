import bcrypt from 'bcrypt';

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
        allowNull: true,
      },
      sodienthoai: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      idKhoa: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      role: {
        type: DataTypes.ENUM,
        allowNull: false,
        values: ['admin', 'teacher', 'student'],
      },
    },
    {
      underscored: true,
    },
  );

  // eslint-disable-next-line func-names
  User.prototype.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
  };

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
