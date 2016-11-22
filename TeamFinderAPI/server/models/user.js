import bcrypt from 'bcrypt';

/**
 * @typedef User
 */
export default (sequelize, DataTypes) => {
  function hashPassword(user) {
    if (!user.changed('password')) {
      return sequelize.Promise.resolve();
    }
    // TODO: MAKE ASYNC WORK
    /* return bcrypt.hash(user.password, 10, (err, hash) => {
      user.setDataValue('password', hash);
    }); */
    user.setDataValue('password', bcrypt.hashSync(user.password, 10));
  }

  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    mobileNumber: {
      type: DataTypes.STRING,
      validate: {
        is: {
          args: /^[0-9]{7}$/,
          msg: 'The value is not a valid mobile number.'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      }
    }
  }, {
    classMethods: {
      associate: (models) => {
        User.belongsToMany(models.Group, { through: models.UserGroup, as: 'groups' });
      }
    },
    instanceMethods: {
      checkPassword: (password, hash, cb) => {
        bcrypt.compare(password, hash, (err, res) => {
          cb(res);
        });
      }
    },
    hooks: {
      beforeCreate: hashPassword,
      beforeUpdate: hashPassword
    }
  });

  return User;
};
