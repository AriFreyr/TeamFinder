import Models from '../models';

/**
 * Load user and append to req.
 */
function load(req, res, next, id) {
  Models.User.findOne({
    where: {
      id
    },
    include: [{
      model: Models.Group,
      through: {
        attributes: ['createdAt', 'admin']
      },
      as: 'groups'
    }]
  }).then((user) => {
    req.user = user;		// eslint-disable-line no-param-reassign
    return next();
  }).error((e) => next(e));
}

/**
 * Get user
 * @returns {User}
 */
function get(req, res) {
  return res.json(req.user);
}

/**
 * Create new user
 * @property {string} req.body.username - The username of user.
 * @property {string} req.body.mobileNumber - The mobileNumber of user.
 * @returns {User}
 */
function create(req, res, next) {
  Models.User.create({
    username: req.body.username,
    mobileNumber: req.body.mobileNumber,
    password: req.body.password
  }).then((user) => res.json(user))
    .error((e) => next(e));
}

/**
 * Update existing user
 * @property {string} req.body.username - The username of user.
 * @property {string} req.body.mobileNumber - The mobileNumber of user.
 * @returns {User}
 */
function update(req, res, next) {
  const user = req.user;

  user.update({
    username: req.body.username,
    mobileNumber: req.body.mobileNumber,
    password: req.body.password
  }).then((savedUser) => res.json(savedUser))
    .error((e) => next(e));
}

/**
 * Get user list.
 * @property {number} req.query.skip - Number of users to be skipped.
 * @property {number} req.query.limit - Limit number of users to be returned.
 * @returns {User[]}
 */
function list(req, res, next) {
  const { limit = 50, offset = 0 } = req.query;
  Models.User.findAll({ offset, limit }).then((users) =>	res.json(users))
    .error((e) => next(e));
}

/**
 * Delete user.
 * @returns {User}
 */
function remove(req, res, next) {
  const user = req.user;
  user.destroy()
    .then((deletedUser) => res.json(deletedUser))
    .error((e) => next(e));
}

export default { load, get, create, update, list, remove };
