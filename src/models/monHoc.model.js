export default (sequelize, DataTypes) => {
  const MonHoc = sequelize.define(
    'MonHoc',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      tenMonHoc: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      underscored: true,
    },
  );

  MonHoc.associate = (models) => {
    MonHoc.hasOne(models.LopHP, {
      foreignKey: 'idMonHoc',
      sourceKey: 'id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
    MonHoc.hasMany(models.Chuong, {
      foreignKey: 'idMonHoc',
      sourceKey: 'id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };

  return MonHoc;
};
