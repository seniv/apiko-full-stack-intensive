const { Router } = require('express');
const { authenticate } = require('../../middleware');

const get = require('./get');
const list = require('./list');
const create = require('./create');
const update = require('./update');
const remove = require('./remove');
const answers = require('./answers');


/**
 * Provide api for questions
 *
 *
 * GET /api/v1/questions/ - List
     @header
            Authorization: Bearer {token}
     @optionalQueryParameters
           search {String} - value to search
           limit {Number} - count of item to send
           skip {Number} - value to search
 *
 *
 * **/

module.exports = (models, { config }) => {
  const api = Router();

  api.get('/', list(models, { config }));
  api.get('/:_id', get(models, { config }));
  api.get('/:_id/answers', answers(models, { config }));
  api.post('/', authenticate, create(models, { config }));
  api.patch('/:_id', authenticate, update(models, { config }));
  api.delete('/:_id', authenticate, remove(models, { config }));

  return api;
};