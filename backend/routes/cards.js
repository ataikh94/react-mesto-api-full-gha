const router = require('express').Router();
const { postCardValidateScheme, getCardByIdValidateScheme } = require('../utils/validationSchemes');

const {
  getCards, postCard, deleteCard, putLikeCard, deleteLikeCard,
} = require('../controllers/cards');

router.get('/cards', getCards);
router.delete('/cards/:cardId', getCardByIdValidateScheme, deleteCard);
router.post('/cards', postCardValidateScheme, postCard);
router.put('/cards/:cardId/likes', getCardByIdValidateScheme, putLikeCard);
router.delete('/cards/:cardId/likes', getCardByIdValidateScheme, deleteLikeCard);

module.exports = router;
