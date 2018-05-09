const express = require('express');
const { errorHandler } = require('../middleware');

// import models
const models = require('../models');

// import each controller
const questions = require('../controllers/questions');
const answers = require('../controllers/answers');
const votes = require('../controllers/votes');

const routersInit = config => {
  const router = express();

  router.use('/questions', questions(models, { config }));
  router.use('/answers', answers(models, { config }));
  router.use('/votes', votes(models, { config }));

  router.use(errorHandler);
  return router;
}

module.exports = routersInit;