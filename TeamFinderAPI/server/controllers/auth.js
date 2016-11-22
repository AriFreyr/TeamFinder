import jwt from 'jsonwebtoken';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';
import Models from '../models';
import config from '../../config/env';

/**
 * Returns jwt token if valid username and password is provided
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function login(req, res, next) {
  Models.User.findOne({
    where: {
      username: req.body.username
    }
  }).then((user) => {
    user.checkPassword(req.body.password, user.password, (valid) => {
      if (valid) {
        const token = jwt.sign({
          userid: user.id,
          username: user.username
        }, config.jwtSecret);
        return res.json({
          token,
          userid: user.id,
          username: user.username
        });
      }

      const err = new APIError('Authentication error', httpStatus.UNAUTHORIZED);
      return next(err);
    });
  }).error((e) => next(e));
}

/**
 * This is a protected route. Will return random number only if jwt token is provided in header.
 * @param req
 * @param res
 * @returns {*}
 */
function getRandomNumber(req, res) {
  // req.user is assigned by jwt middleware if valid token is provided
  return res.json({
    user: req.auth,
    num: Math.random() * 100
  });
}

export default { login, getRandomNumber };
