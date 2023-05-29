const { celebrate, Joi } = require('celebrate');

const linkPattern = /(https?:\/\/)(w{3}\.)?(\w+[-.~:/?#[\]@!$&'()*+,;=]*?((-\w+[-.~:/?#[\]@!$&'()*+,;=]*?)+)?)(\.ru)(((\/\w+)+)?\/?)?#?/;

const getUserByIdValidateScheme = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex().required(),
  }),
});

const patchUserInfoValidateScheme = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});

const patchUserAvatarValidateScheme = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().regex(linkPattern),
  }),
});

const postUserValidateScheme = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(linkPattern),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

const loginValidateScheme = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

const postCardValidateScheme = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().required().regex(linkPattern),
  }),
});

const getCardByIdValidateScheme = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
});

module.exports = {
  getUserByIdValidateScheme,
  patchUserInfoValidateScheme,
  patchUserAvatarValidateScheme,
  postUserValidateScheme,
  loginValidateScheme,
  postCardValidateScheme,
  getCardByIdValidateScheme,
};
