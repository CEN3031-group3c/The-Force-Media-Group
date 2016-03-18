'use strict';

class NavbarController {
  //start-non-standard
  menu = [
    {
    'title': 'Home',
    'state': 'main'
  }, {
	'title': 'About Me',
	'state': 'bio'
  }, {
	'title': 'Blog',
	'state': 'blog'
  }, {
	'title': 'Booking',
	'state': 'booking'
  }, {
	'title': 'Store',
	'state': 'store'
  }];

  isCollapsed = true;
  //end-non-standard

  constructor(Auth, $scope) {
    this.isLoggedIn = Auth.isLoggedIn;
    this.isAdmin = Auth.isAdmin;
    this.getCurrentUser = Auth.getCurrentUser;
    this.scope = $scope;
    this.scope.$on('startLoading', this.startLoading);
    this.scope.$on('stopLoading', this.stopLoading);

  }

  startLoading(event) {
    console.log('start');
    $('.loader-icon').removeClass('shrinking-cog').addClass('growing-cog');
    setTimeout(function() {
      $('.loader-icon').removeClass('growing-cog').addClass('spinning-cog');
    }, 100);
  }

  stopLoading(event) {
    console.log('stop');
    $('.loader-icon').removeClass('growing-cog').addClass('shrinking-cog');
  }


}

angular.module('fmgApp')
  .controller('NavbarController', NavbarController);
