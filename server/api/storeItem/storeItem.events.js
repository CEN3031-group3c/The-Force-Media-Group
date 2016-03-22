/**
 * StoreItem model events
 */

'use strict';

import {EventEmitter} from 'events';
var StoreItem = require('./storeItem.model');
var StoreItemEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
StoreItemEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  StoreItem.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    StoreItemEvents.emit(event + ':' + doc._id, doc);
    StoreItemEvents.emit(event, doc);
  }
}

export default StoreItemEvents;
