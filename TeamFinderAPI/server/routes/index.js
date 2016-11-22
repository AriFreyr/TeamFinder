import express from 'express';
import userRoutes from './user';
import authRoutes from './auth';
import groupRoutes from './group';

const router = express.Router();	// eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

// mount user routes at /users
router.use('/users', userRoutes);

// mount group routes at /groups
router.use('/groups', groupRoutes);

// mount auth routes at /auth
router.use('/auth', authRoutes);

export default router;
