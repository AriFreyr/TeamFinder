// import httpStatus from 'http-status';
// import APIError from '../helpers/APIError';
import Models from '../models';

/**
 * Load group and append to req.
 */
function load(req, res, next, id) {
  Models.Group.findOne({
    where: {
      id
    },
    include: {
      model: Models.User,
      through: {
        attributes: ['createdAt', 'admin']
      },
      as: 'users'
    }
  }).then((group) => {
    req.group = group;		// eslint-disable-line no-param-reassign
    return next();
  }).error((e) => next(e));
}

/**
 * Get group
 * @returns {Group}
 */
function get(req, res) {
  return res.json(req.group);
}

/**
 * Create new group
 * @property {string} req.body.name - The name of the group.
 * @returns {Group}
 */
function create(req, res, next) {
  Models.Group.create({
    name: req.body.name
  }).then((group) => {
    group.addUser(req.auth.userid, { admin: true }).then(() =>
      res.json(group)
    ).error((e) => next(e));
  }).error((e) => next(e));
}

/**
 * Update existing group
 * @property {string} req.body.name - The name of group.
 * @returns {Group}
 */
function update(req, res, next) {
  const group = req.group;

  group.update({
    name: req.body.name
  }).then((savedGroup) => res.json(savedGroup))
    .error((e) => next(e));
}

/**
 * Get group list.
 * @property {number} req.query.skip - Number of groups to be skipped.
 * @property {number} req.query.limit - Limit number of groups to be returned.
 * @returns {Group[]}
 */
function list(req, res, next) {
  const { limit = 50, offset = 0 } = req.query;
  Models.Group.findAll({ offset, limit }).then((groups) =>	res.json(groups))
    .error((e) => next(e));
}

/**
 * Delete group.
 * @returns {Group}
 */
function remove(req, res, next) {
  const group = req.group;
  group.destroy()
    .then((deletedGroup) => res.json(deletedGroup))
    .error((e) => next(e));
}


/**
 * Modifies group.
 * @returns {Group}
 */
function patch(req, res, next) {
  const group = req.group;
  // const currentUser = req.auth.userid;
  // const userInGroup = group.users.filter((user) => (currentUser === user.id));
  let patchObject;

  // if (!userInGroup.UserGroup.admin) {
  //  return next(new APIError('You are not allowed to do that', httpStatus.FORBIDDEN));
  // }

  const newName = req.body.name;
  if (newName !== undefined && newName !== req.group.name) {
    patchObject.name = newName;
  }

  Models.User.findAll({ where: { id: { $in: req.body.users } } })
    .then((users) => {
      group.addUsers(users)
        .then((newGroup) => res.json(newGroup))
        .error((e) => next(e));
    })
    .error((e) => next(e));
}

export default { load, get, create, update, list, remove, patch };
