'use strict';

(function() {

class AdminController {
  constructor(User, $scope, signUpService, toaster) {
    // Use the User $resource to fetch all users
    this.users = User.query();
    this.scope = $scope;
    this.signUpService = signUpService;
    this.scope.showDialog = false;
    this.toaster = toaster;

  }

  delete(user) {
    user.$remove();
    this.users.splice(this.users.indexOf(user), 1);
  }

  sendText() {
    var scope = this.scope;
    var toaster = this.toaster;
    console.log(this.textBody);
    if(this.textBody) {
      this.signUpService.sendTextToGroup(this.textBody).success(function(data) {
        console.log(data);
        scope.showDialog = false;
        toaster.pop("success", "Text message sent!");
      });
    }
  }

  showDialog(){
    this.scope.showDialog = true;
  };

  hideDialog() {
    this.scope.showDialog = false;
  }


}

angular.module('fmgApp.admin')
  .controller('AdminController', AdminController);

})();
