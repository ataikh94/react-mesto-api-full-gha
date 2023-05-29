const router = require('express').Router();
const NotFoundError = require('../errors/not-found-error');
const { loginValidateScheme, postUserValidateScheme } = require('../utils/validationSchemes');
const authMiddleware = require('../middlewares/auth');
const { login, postUser } = require('../controllers/users');

const userRouter = require('./users');
const cardRouter = require('./cards');

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

router.post('/signin', loginValidateScheme, login);
router.post('/signup', postUserValidateScheme, postUser);
router.get('/signout', (req, res) => {
  res.clearCookie('jwt').send({ message: 'Выход' });
});

router.use(authMiddleware, userRouter);
router.use(authMiddleware, cardRouter);
router.use('/*', authMiddleware, (req, res, next) => next(new NotFoundError('Страница не найдена')));
router.use((req, res, next) => {
  next(new NotFoundError('Объект не найден'));
});

module.exports = router;
