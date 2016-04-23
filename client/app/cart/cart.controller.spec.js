'use strict';

describe('Controller: CartCtrl', function () {
  var $scope, ctrl, $timeout, httpBackend, q;

  /* declare our mocks out here
   * so we can use them through the scope
   * of this describe block.
   */
  var  storeServiceMock,
    AuthMock,
    stateparams,
    state,
    toaster;

  var sampleStoreResponse = { data: [{
    _id: 1,
    Name: "shirt",
    Picture: "https://drive.google.com/uc?id=0B-viYPCddrMLN29HdEFObjNhRXc",
    Price: 5.00,
    Description: "a shirt",
    Quantity: 2
  },
    {
      _id: 2,
      Name: "pants",
      Picture: "https://drive.google.com/uc?id=0B-viYPCddrMLN29HdEFObjNhRXc",
      Price: 10.00,
      Description: "pants",
      Quantity: 1
    }]
  };



  // This function will be called before every "it" block.
  // This should be used to "reset" state for your tests.
  beforeEach(function (){
    // Create "spy objects" for our services.
    // This will isolate the controller we're testing from
    // any other code.
    // we'll set up the returns for this later
    storeServiceMock = jasmine.createSpyObj('storeService', ['getAllStoreItems', 'createStoreItem', 'updateItem', 'deleteItem']);
    AuthMock = jasmine.createSpyObj('Auth', ['isLoggedIn', 'isAdmin', 'getCurrentUser']);

    // load the module you're testing.
    module('fmgApp');

    // INJECT! This part is critical
    // $rootScope - injected to create a new $scope instance.
    // $controller - injected to create an instance of our controller.
    // $q - injected so we can create promises for our mocks.
    // _$timeout_ - injected to we can flush unresolved promises.
    inject(function($controller, $rootScope, $q, _$timeout_, $httpBackend, _toaster_) {
      // create a scope object for us to use.
      $scope = $rootScope.$new();
      stateparams = { items: [{
        _id: 1,
        Name: "shirt",
        Picture: "https://drive.google.com/uc?id=0B-viYPCddrMLN29HdEFObjNhRXc",
        Price: 5.00,
        Description: "a shirt",
        Quantity: 2
      },
        {
          _id: 2,
          Name: "pants",
          Picture: "https://drive.google.com/uc?id=0B-viYPCddrMLN29HdEFObjNhRXc",
          Price: 10.00,
          Description: "pants",
          Quantity: 1
        }] };

      // set up the returns for our mocks
      // $q.when(value) creates a resolved promise to value.
      // this is important since our service is async and returns a promise.
      AuthMock.isLoggedIn.and.returnValue(false);
      AuthMock.isAdmin.and.returnValue(false);
      AuthMock.getCurrentUser.and.returnValue(null);
      storeServiceMock.getAllStoreItems.and.returnValue($q.when(sampleStoreResponse));

      toaster = _toaster_;
      spyOn(toaster, 'pop');
      state = {
        go:function(state, args){}
      };

      // assign $timeout to a scoped variable so we can use
      // $timeout.flush() later. Notice the _underscore_ trick
      // so we can keep our names clean in the tests.
      $timeout = _$timeout_;

      // hack for weird extra GET app/main/main.html request
      httpBackend = $httpBackend;

      // Using this to create/resolve promises in the tests.
      q = $q;

      // now run that scope through the controller function,
      // injecting any services or other injectables we need.
      // **NOTE**: this is the only time the controller function
      // will be run, so anything that occurs inside of that
      // will already be done before the first spec.
      ctrl = $controller('CartCtrl', {
        $scope: $scope,
        storeService: storeServiceMock,
        Auth: AuthMock,
        toaster: toaster,
        $stateParams: stateparams,
        $state: state
      });
    });
  });

  it('should start with the correct scope variable values', function() {
    expect($scope.showDialog).toBe(false);
    expect($scope.currentItem).toBeUndefined();
    expect($scope.items).toEqual(stateparams.items);
    expect($scope.orderTotal).toEqual(0);
    expect($scope.currentUser).toEqual(AuthMock.getCurrentUser());
    expect($scope.checkingOut).toBe(false);
    expect($scope.shippingInfo).toEqual({
      fullName: undefined,
      address1: undefined,
      address2: undefined,
      city: undefined,
      state: '',
      zip: undefined,
      longZip: undefined
    });
    expect($scope.card).toEqual({
      number: undefined,
      exp_month: undefined,
      exp_year: undefined,
      cvv: undefined
    });

    //expect states, but why make this test super long? go with what you feel.
  });

  it('should update the order total when item quantity changes', function() {
    httpBackend.expectGET('app/main/main.html').respond(200); // don't know why this is happening
    $scope.$digest();
    expect($scope.orderTotal).toEqual(20);
    $scope.items[0].Quantity = 3;
    $scope.$digest();
    expect($scope.orderTotal).toEqual(25);

  });


  it('show show confirmation page for removing an itme', function() {
    $scope.currentItem = 0;
    $scope.confirmRemoveItem(0);
    expect($scope.currentItem).toEqual(0);
    expect($scope.showDialog).toBe(true);
  });

  it('should remove an item from the cart when delete is clicked', function() {

    var length = $scope.items.length;
    $scope.removeItem();
    expect($scope.items.length + 1).toEqual(length);
    expect(toaster.pop).toHaveBeenCalledWith('success', 'Item removed from cart');
    expect($scope.showDialog).toBe(false);

    //reset items
    $scope.items = stateparams.items;

  });

  it('should return to store if item is deleted and nothing is left in the cart', function() {
    spyOn(state, 'go');
    $scope.items = [];
    $scope.$digest();
    expect(toaster.pop).toHaveBeenCalledWith('error', 'There are no items in your cart.', 'Add items to your cart from the store.');
    expect(state.go).toHaveBeenCalledWith('store');

  });

  it('should close the dialog properly', function() {
    $scope.closeDialog();
    expect($scope.currentItem).toBeUndefined();
    expect($scope.showDialog).toBe(false);
  });

  //fix this test.
  it('should only allow whole numbers for cart quantities', function() {
    var event = document.createEvent('Event');
    event.keyCode = 48;
    event.initEvent('keydown');
    $scope.validate(event);
    $scope.$digest();
    expect(event.returnValue).toEqual(true);

    var invalidEvent = document.createEvent('Event');
    invalidEvent.keyCode = 65;
    invalidEvent.initEvent('keydown');
    $scope.validate(invalidEvent);
    $scope.$digest();
    expect(event.returnValue).toEqual(true);
  });


  it('should hide the dialogue properly', function() {
    $scope.hideDialog();
    expect($scope.showDialog).toBe(false);
  });

  it('should let you go back and edit the address', function() {
    $scope.changeAddress();
    expect($scope.checkingOut).toBe(false);
  });



  //these tests still need implemented
  it("shouldn\'t continue to checkout if address is invalid", function() {
    expect(1).toEqual(1);

  });

  it('should continue to checkout if address is valid', function() {
    expect(1).toEqual(1);

  });

  it('should accept valid payment', function() {
    expect(1).toEqual(1);
  });

  it('should not accept invalid payment', function() {
    expect(1).toEqual(1);
  });








});
