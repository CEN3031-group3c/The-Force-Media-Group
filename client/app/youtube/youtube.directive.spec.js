'use strict';

describe('Directive: youtube', function () {

  // load the directive's module and view
  beforeEach(module('fmgApp'));
  beforeEach(module('app/main/main.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  xit('Should have the proper id for YouTube to consume', inject(function ($compile) {
    element = angular.element('<youtube></youtube>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.attr('id')).toBe('youtube-player');
  }));
});
