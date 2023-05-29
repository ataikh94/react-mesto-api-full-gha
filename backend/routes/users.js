const router = require('express').Router();
const { getUserByIdValidateScheme, patchUserInfoValidateScheme, patchUserAvatarValidateScheme } = require('../utils/validationSchemes');

const {
  getUsers, getUserById, patchUserInfo, patchUserAvatar, getCurrentUser,
} = require('../controllers/users');

router.get('/users', getUsers);
router.get('/users/me', getCurrentUser);
router.get('/users/:userId', getUserByIdValidateScheme, getUserById);
router.patch('/users/me', patchUserInfoValidateScheme, patchUserInfo);
router.patch('/users/me/avatar', patchUserAvatarValidateScheme, patchUserAvatar);

module.exports = router;
