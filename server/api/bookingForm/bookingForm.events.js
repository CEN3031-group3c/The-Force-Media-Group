/**
 * BookingForm model events
 */

'use strict';

import {EventEmitter} from 'events';
var BookingForm = require('./bookingForm.model');
var BookingFormEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
BookingFormEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  BookingForm.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    BookingFormEvents.emit(event + ':' + doc._id, doc);
    BookingFormEvents.emit(event, doc);
  }
}

export default BookingFormEvents;
