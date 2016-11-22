/**
 * @typedef UserGroup
 */
export default (sequelize, DataTypes) => {
  const UserGroup = sequelize.define('UserGroup', {
    admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });

  return UserGroup;
};
