/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/storeItems              ->  index
 * POST    /api/storeItems              ->  create
 * GET     /api/storeItems/:id          ->  show
 * PUT     /api/storeItems/:id          ->  update
 * DELETE  /api/storeItems/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import StoreItem from './storeItem.model';

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
    return updated.saveAsync()
      .spread(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.removeAsync()
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

// Gets a list of StoreItems
export function index(req, res) {
  StoreItem.find(req.params)
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));

  //StoreItem.find().exec(function(err, storeItems) {
  //  if(err) {
  //    res.status(400).send(err);
  //  } else {
  //    res.json(storeItems);
  //  }
  //});
}

// Gets a single StoreItem from the DB
export function show(req, res) {
  StoreItem.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new StoreItem in the DB
export function create(req, res) {
  return StoreItem.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing StoreItem in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return StoreItem.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Blog from the DB
export function destroy(req, res) {
  return StoreItem.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
