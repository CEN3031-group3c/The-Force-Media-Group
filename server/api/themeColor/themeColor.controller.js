/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/themeColors              ->  index
 * POST    /api/themeColors              ->  create
 * GET     /api/themeColors/:id          ->  show
 * PUT     /api/themeColors/:id          ->  update
 * DELETE  /api/themeColors/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import ThemeColor from './themeColor.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.save()
      .then(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of ThemeColors
export function index(req, res) {
  ThemeColor.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single ThemeColor from the DB
export function show(req, res) {
  ThemeColor.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new ThemeColor in the DB
export function create(req, res) {
  ThemeColor.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing ThemeColor in the DB
export function update(req, res) {
    ThemeColor.findById(req.params.id).exec()
      .then(handleEntityNotFound(res))
      .then(saveUpdates(req.body))
      .then(respondWithResult(res))
      .catch(handleError(res));
}


// Deletes a ThemeColor from the DB
export function destroy(req, res) {
  ThemeColor.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
