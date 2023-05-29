require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const router = require('./routes');
const { requestLogger, errorLogger } = require('./middlewares/loggers');

const app = express();

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://127.0.0.1/mestodb', {
  useNewUrlParser: true,
});

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use(helmet());

app.use(requestLogger);
app.use(router);
app.use(errorLogger);
router.use(errors());

router.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === 500 ? 'На сервере произошла ошибка.' : message,
    });
  return next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
