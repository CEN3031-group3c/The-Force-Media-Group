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
var shippo = require('shippo')('d0120ed2ca350acbcc430b07c2fa703641912098');

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

// Gets a list of StoreItems
export function index(req, res) {
  StoreItem.find(req.params).exec()
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
  StoreItem.findById(req.params.id).exec()
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


export function createCharge(req, res) {
  // setup stripe with test API key
  var stripe = require("stripe")(
    "sk_test_IwZeKVydQnhNLuhUlWddgIZf"
  );

  // create charge using stripe module
  return stripe.charges.create({
    amount: req.body.amount,
    currency: "usd",
    card: {
      number: req.body.card.number,
      exp_month: req.body.card.exp_month,
      exp_year: req.body.card.exp_year,
      cvc: req.body.card.cvv
    },
    description: req.body.description
  }, function(err, charge) {
    if (err) {
      // bad things
      res.json(err);
    } else {
      // successful charge
      res.json(charge);
    }
  });



}

export function validateAddress(req, res) {
  if(req.body.address2 !== null) {
    shippo.address.create({
      "object_purpose": "QUOTE",
      "name": req.body.fullName,
      "street1": req.body.address1,
      "city": req.body.city,
      "state": req.body.state,
      "zip": req.body.zip,
      "country": "US",
      "validate": true
    }, function (err, shippo) {
      if (err) {
        res.json(err);
      } else {
        res.json(shippo);
      }
    });
  }
  else {
    shippo.address.create({
      "object_purpose":"QUOTE",
      "name": req.body.fullName,
      "street1": req.body.address1,
      "street2": req.body.address2,
      "city": req.body.city,
      "state": req.body.state,
      "zip": req.body.zip,
      "country":" US",
      "validate": true
    }, function(err, shippo) {
      if (err) {
        res.json(err);
      } else {
        res.json(shippo);
      }
    });
  }
}
