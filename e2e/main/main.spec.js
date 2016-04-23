'use strict';

var config = browser.params;

describe('Main View', function() {
  var page;

  beforeEach(function() {
    browser.get(config.baseUrl + '/');
    page = require('./main.po');
  });

  it('should include a youtube player and a headshot image', function() {
    expect(page.youtubePlayer).toBeDefined();
    //expect(page.imgHeadshot.getAttribute('src')).toMatch(/headshot.png$/);
    expect(page.imgHeadshot.getAttribute('alt')).toBe('headshot image');
  });
});
