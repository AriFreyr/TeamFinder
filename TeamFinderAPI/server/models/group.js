/**
 * @typedef Group
 */
export default (sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {
    name: {
      type: DataTypes.STRING
    }
  }, {
    classMethods: {
      associate: (models) => {
        Group.belongsToMany(models.User, { through: 'UserGroup' });
      }
    }
  });

  return Group;
};
