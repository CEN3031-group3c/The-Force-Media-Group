// 'use strict';
//
// var assert = require('assert');
// var eztextingCtrl = require('./eztexting.controller');
//
// //var proxyquire = require('proxyquire').noPreserveCache();
//
// // require the controller with our stubbed out modules
// // var eztextingCtrl = proxyquire('./eztexting.controller', {
// //   'request': function(options, callback) {
// //     callback(null, null, options.PhoneNumbers);
// //   }
// // });
//
// var reqMock = {
//   params: {
//     phoneNumber = '5555555555'
//   }
// };
//
// var optionsMock = {
//   method: 'POST',
//   uri: 'https://app.eztexting.com/sending/messages',
//   form: {
//     format: 'json',
//     User: 'jarmonedavis',
//     Password: 'gavin',
//     PhoneNumbers: reqMock,
//     Message: 'Congratulations! You have been subscribed to receive text message updates from Jarmone Davis.'
//   },
//   json: true
// };
//
// var responseStub = {
//   send: sinon.stub().returns(0)
// };
//
//
// describe('Eztexting API:', function() {
//
//   describe('GET /api/sendConfirmationMessage/:phoneNumber', function() {
//
//     xit('should should respond with mocked PhoneNumber', function() {
//
//       eztextingCtrl.sendConfirmationMessage(reqMock, responseStub);
//
//       should(null).not.be.ok();
//       //responseStub.send
//         //.should.have.been.called.once;
//     });
//
//   });
//
//
// });
