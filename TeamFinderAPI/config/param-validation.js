import Joi from 'joi';

export default {
  // POST /api/users
  createUser: {
    body: {
      username: Joi.string().required(),
      mobileNumber: Joi.string().regex(/^[0-9]{7}$/).required(),
      password: Joi.string().min(6).alphanum().required().strip()
    }
  },

  // UPDATE /api/users/:userId
  updateUser: {
    body: {
      username: Joi.string().required(),
      mobileNumber: Joi.string().regex(/^[0-9]{7}$/).required()
    },
    params: {
      userId: Joi.string().hex().required()
    }
  },

  // POST /api/groups
  createGroup: {
    body: {
      name: Joi.string().min(3).required()
    }
  },

  // UPDATE /api/groups/:groupId
  updateGroup: {
    body: {
      name: Joi.string().min(3).required(),
      users: Joi.array().required()
    },
    params: {
      groupId: Joi.string().hex().required()
    }
  },

  patchGroup: {
    params: {
      groupId: Joi.string().hex().required()
    }
  },

  // POST /api/auth/login
  login: {
    body: {
      username: Joi.string().required(),
      password: Joi.string().required().strip()
    }
  }
};
