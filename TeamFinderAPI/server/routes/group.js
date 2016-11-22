import express from 'express';
import validate from 'express-validation';
import paramValidation from '../../config/param-validation';
import groupCtrl from '../controllers/group';

const router = express.Router();	// eslint-disable-line new-cap

router.route('/')
  /** GET /api/groups - Get list of groups */
  .get(groupCtrl.list)

  /** POST /api/groups - Create new group */
  .post(validate(paramValidation.createGroup), groupCtrl.create);

router.route('/:groupId')
  /** GET /api/groups/:groupId - Get group */
  .get(groupCtrl.get)

  /** PUT /api/groups/:groupId - Update group */
  .put(validate(paramValidation.updateGroup), groupCtrl.update)

  /** DELETE /api/groups/:groupId - Delete group */
  .delete(groupCtrl.remove)

  /** PATCH /api/groups/:groupId Patch group */
  .patch(validate(paramValidation.patchGroup), groupCtrl.patch);

/** Load user when API with userId route parameter is hit */
router.param('groupId', groupCtrl.load);

export default router;
