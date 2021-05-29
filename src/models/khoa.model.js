export default (sequelize, DataTypes) => {
  const Khoa = sequelize.define(
    'Khoa',
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      tenKhoa: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      underscored: true,
    },
  );

  Khoa.associate = (models) => {
    Khoa.hasMany(models.User, {
      foreignKey: 'idKhoa',
      sourceKey: 'id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };

  return Khoa;
};
