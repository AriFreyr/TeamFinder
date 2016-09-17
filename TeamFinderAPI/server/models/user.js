/**
 * @typedef User
 */
export default (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    username: {
      type: DataTypes.STRING
    },
    mobileNumber: {
      type: DataTypes.STRING,
      validate: {
        is: {
          args: /^[0-9]{7}$/,
          msg: 'The value is not a valid mobile number.'
        }
      }
    }
  });

  return User;
};
