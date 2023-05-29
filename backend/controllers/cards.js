const Card = require('../models/card');
const NotFoundError = require('../errors/not-found-error');
const BadRequest = require('../errors/bad-request-error');
const Forbidden = require('../errors/forbidden-error');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch((err) => next(err));
};

module.exports.postCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(201).send(card))
    .catch((e) => {
      if (e.name === 'ValidationError') {
        return next(new BadRequest('По указанным данным пользователь не найден.'));
      }
      return next(e);
    });
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        return next(new NotFoundError('Карточки с таким ID не существует'));
      }
      if (card.owner.toString() !== req.user._id) {
        return next(new Forbidden('Недостаточно прав для удаления карточки.'));
      }
      return card.deleteOne()
        .then(() => res.send(card));
    })
    .catch((e) => {
      if (e.name === 'CastError') {
        return next(new BadRequest('Передан некорректный ID.'));
      }
      return next(e);
    });
};

module.exports.putLikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return next(new NotFoundError('Карточки с таким ID не существует'));
      }
      return res.send(card);
    })
    .catch((e) => {
      if (e.name === 'CastError') {
        return next(new BadRequest('Передан некорректный ID.'));
      }
      return next(e);
    });
};

module.exports.deleteLikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return next(new NotFoundError('Карточки с таким ID не существует'));
      }
      return res.send(card);
    })
    .catch((e) => {
      if (e.name === 'CastError') {
        return next(new BadRequest('Передан некорректный ID.'));
      }
      return next(e);
    });
};
