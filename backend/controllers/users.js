const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-error');
const Unauthorized = require('../errors/unauthorized-error');
const BadRequest = require('../errors/bad-request-error');
const Conflict = require('../errors/conflict-error');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        return next(new NotFoundError('Пользователя с таким ID не существует'));
      }
      return res.send(user);
    })
    .catch((e) => {
      if (e.name === 'CastError') {
        return next(new BadRequest('По указанным данным пользователь не найден.'));
      }
      return next(e);
    });
};

module.exports.postUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((elem) => {
      const elemObj = elem.toObject();
      delete elemObj.password;
      res.status(201).send(elemObj);
    })
    .catch((e) => {
      if (e.name === 'ValidationError') {
        return next(new BadRequest('Переданы некорректные данные.'));
      }
      if (e.code === 11000) {
        return next(new Conflict('Пользователь с таким email уже существует.'));
      }
      return next(e);
    });
};

module.exports.patchUserInfo = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        return next(new NotFoundError('Пользователя с таким ID не существует'));
      }
      return res.send(user);
    })
    .catch((e) => {
      if (e.name === 'ValidationError' || e.name === 'CastError') {
        return next(new BadRequest('Переданы некорректные данные.'));
      }
      return next(e);
    });
};

module.exports.patchUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        return next(new NotFoundError('Пользователя с таким ID не существует'));
      }
      return res.send(user);
    })
    .catch((e) => {
      if (e.name === 'ValidationError' || e.name === 'CastError') {
        return next(new BadRequest('Переданы некорректные данные.'));
      }
      return next(e);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return next(new Unauthorized('Неправильные почта или пароль'));
      }

      return bcrypt.compare(password, user.password)
        .then((isValidPassword) => {
          if (!isValidPassword) {
            return next(new Unauthorized('Неправильные почта или пароль'));
          }
          const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
          /*           return res.cookie('jwt', token, {
                      httpOnly: true,
                      sameSite: true,
                    })
                      .send(user.toJSON()); */
          return res.status(200).send({ token, data: user.toJSON() });
        });
    })
    .catch((err) => next(err));
};

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        return next(new NotFoundError('Пользователя с таким ID не существует'));
      }
      return res.send(user);
    })
    .catch((e) => {
      if (e.name === 'CastError') {
        return next(new BadRequest('Переданы некорректные данные.'));
      }
      return next(e);
    });
};
