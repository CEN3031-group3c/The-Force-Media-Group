'use strict';

angular.module('fmgApp')
  .controller('CartCtrl', function ($scope, toaster, $stateParams, Auth, $state, storeService, emailService) {
    $scope.showDialog = false;
    $scope.currentItem = undefined;
    $scope.items = $stateParams.items;
    $scope.orderTotal = 0;
    $scope.currentUser = Auth.getCurrentUser();
    $scope.checkingOut = false;
    $scope.shippingInfo = {
      fullName: undefined,
      address1: undefined,
      address2: undefined,
      city: undefined,
      state: '',
      zip: undefined,
      longZip: undefined
    };


    $scope.card = {
      number: undefined,
      exp_month: undefined,
      exp_year: undefined,
      cvv: undefined
    };

    $scope.validate = function (evt) {
      var theEvent = evt || window.event;
      var key = theEvent.keyCode || theEvent.which;
      key = String.fromCharCode( key );
      var regex = /^[0-9]*$/;
      if( !regex.test(key) ) {
        theEvent.returnValue = false;
        if(theEvent.preventDefault) theEvent.preventDefault();
      }
    };

    //deep watch items array. If quantity changes on any item, update the order total.
    $scope.$watch('items', function(items) {
      if(items.length === 0) {
        toaster.pop('error', 'There are no items in your cart.', 'Add items to your cart from the store.');
        $state.go('store');
      }

      var total = 0;
      items.forEach(function(item) {
        total += item.Price * item.Quantity;
      });

      console.info("HERE");
      console.info($scope.orderTotal);
      $scope.orderTotal = total;
      console.log('updated total');
    }, true);


    $scope.confirmRemoveItem = function(index) {
      $scope.currentItem = index;
      $scope.showDialog = true;
    };

    $scope.closeDialog = function() {
      $scope.currentItem = undefined;
      $scope.showDialog = false;
    };

    //watch function will recalculate total after remove.
    $scope.removeItem = function() {
      $scope.items.splice($scope.currentItem, 1);
      toaster.pop('success', 'Item removed from cart');

      $scope.hideDialog();
    };

    $scope.hideDialog = function() {
      $scope.showDialog = false;
    };


    $scope.checkout = function() {
      var addressObj = {
        fullName: $scope.shippingInfo.fullName,
        address1: $scope.shippingInfo.address1,
        address2: $scope.shippingInfo.address2,
        city: $scope.shippingInfo.city,
        state: $scope.shippingInfo.state,
        zip: $scope.shippingInfo.zip
      };

      //node will return VALID if address is a valid shipping address.
      storeService.validateAddress(addressObj).success(function(data) {

        if(data.object_state === 'VALID') {
          $scope.checkingOut = true;

          //replace address with validated address so the user can make sure they're the same.
          //sometimes the validator will lookup the address and replace the zipcode with a valid zipcode.
          $scope.shippingInfo.fullName = data.name;
          $scope.shippingInfo.address1 = data.street1;
          $scope.shippingInfo.address2 = data.street2;
          $scope.shippingInfo.city = data.city;
          $scope.shippingInfo.state = data.state;
          $scope.shippingInfo.longZip = data.zip;
        } else {
          if(data.messages instanceof Array)
            toaster.pop('error', 'Invalid Address', data.messages[0].text);
          else
            toaster.pop('error', 'Invalid Address', data.message);
        }
      });
    };

    $scope.changeAddress = function() {
      $scope.checkingOut = false;
    };


    $scope.submitPayment = function() {
      var priceInCents = Math.floor($scope.orderTotal * Math.pow(10,2));
      var stripeObj = {
        amount: priceInCents,
        card: $scope.card,
        description: 'Charge for ' + $scope.currentUser.email
      };

      //create stripe charge, and then send email to logged in user and merchandise store.
      storeService.createCharge(stripeObj).then(function(response) {

        var emailString = '<head><style>#productsTable td { padding-left:5px; padding-right:5px;}</style></head>' +
          '<h3>Shipping Information</h3>' +
          '<table>' +
          '<tr>' +
          '<td style=\'text-align:right\'>Full Name:</td>' +
          '<td style=\'width:5px\'></td>' +
          '<td>' + $scope.shippingInfo.fullName +
          '</td>' +
          '</tr>' +
          '<tr>' +
          '<td style=\'text-align:right\'>Address 1:</td>' +
          '<td style=\'width:5px\'></td>' +
          '<td>' + $scope.shippingInfo.address1 +
          '</td>' +
          '</tr>';
          if($scope.shippingInfo.address2 !== undefined) {
            emailString += '<tr>' +
            '<td style=\'text-align:right\'>Address 2:</td>' +
            '<td style=\'width:5px\'></td>' +
            '<td>' + $scope.shippingInfo.address2 +
            '</td>' +
            '</tr>';
          }

          emailString += '<tr>' +
          '<td style=\'text-align:right\'>City:</td>' +
          '<td style=\'width:5px\'></td>' +
          '<td>' + $scope.shippingInfo.city +
          '</td>' +
          '</tr>' +
          '<tr>' +
          '<td style=\'text-align:right\'>State:</td>' +
          '<td style=\'width:5px\'></td>' +
          '<td>' + $scope.shippingInfo.state +
          '</td></tr>' +
          '<tr>' +
          '<td style=\'text-align:right\'>Zip Code:</td>' +
          '<td style=\'width:5px\'></td>' +
          '<td>' + $scope.shippingInfo.zip +
          '</td></tr>' +
          '</table><br />' +
          '<h3>Products Ordered</h3>' +
          '<table id=\'productsTable\' border=\'solid 1px black\'>' +
          '<thead>' +
          '<tr>' +
          '<td>Name</td>' +
          '<td>Price</td>' +
          '<td>Quantity Ordered</td>' +
          '</tr></thead>' +
          '<tbody style=\'border-top:solid 1px black\'>';


        $scope.items.forEach(function(item) {
          emailString += '<tr>' +
            '<td>' + item.Name +
            '</td>' +
            '<td style=\'text-align:center;\'>' + item.Price +
            '</td>' +
            '<td style=\'text-align:center;\'>' + item.Quantity +
            '</td>' +
            '</tr>';
        });

        emailString += '</tbody></table>';
        emailString += '<br />' +
          '<h3>Order Total: $' + $scope.orderTotal +
          '</h3>'

        //send a copy of email to jarmone and to the logged in user
        if(response.data.status === 'succeeded') {
          var merchObj = {
            sendTo: 'fmgMerchandise@gmail.com',
            subject: 'New Merchandise Order from ' + $scope.currentUser.email,
            emailBody: emailString
          };

          var userObj = {
            sendTo: $scope.currentUser.email,
            subject: 'FMG Order Placed!',
            emailBody: emailString
          };

          emailService.sendEmail(merchObj).then(function () {
            emailService.sendEmail(userObj).then(function() {
              toaster.pop('success', 'Order Placed.', 'An email has been sent to confirm your order details.');
              $state.go('store');
            });
          });
        } else {
          toaster.pop('error', 'Payment Error!', data.data.message);
        }
      });
    };



    $scope.states = [
      {
        'name': 'Alabama',
        'abbreviation': 'AL'
      },
      {
        'name': 'Alaska',
        'abbreviation': 'AK'
      },
      {
        'name': 'American Samoa',
        'abbreviation': 'AS'
      },
      {
        'name': 'Arizona',
        'abbreviation': 'AZ'
      },
      {
        'name': 'Arkansas',
        'abbreviation': 'AR'
      },
      {
        'name': 'California',
        'abbreviation': 'CA'
      },
      {
        'name': 'Colorado',
        'abbreviation': 'CO'
      },
      {
        'name': 'Connecticut',
        'abbreviation': 'CT'
      },
      {
        'name': 'Delaware',
        'abbreviation': 'DE'
      },
      {
        'name': 'District Of Columbia',
        'abbreviation': 'DC'
      },
      {
        'name': 'Federated States Of Micronesia',
        'abbreviation': 'FM'
      },
      {
        'name': 'Florida',
        'abbreviation': 'FL'
      },
      {
        'name': 'Georgia',
        'abbreviation': 'GA'
      },
      {
        'name': 'Guam',
        'abbreviation': 'GU'
      },
      {
        'name': 'Hawaii',
        'abbreviation': 'HI'
      },
      {
        'name': 'Idaho',
        'abbreviation': 'ID'
      },
      {
        'name': 'Illinois',
        'abbreviation': 'IL'
      },
      {
        'name': 'Indiana',
        'abbreviation': 'IN'
      },
      {
        'name': 'Iowa',
        'abbreviation': 'IA'
      },
      {
        'name': 'Kansas',
        'abbreviation': 'KS'
      },
      {
        'name': 'Kentucky',
        'abbreviation': 'KY'
      },
      {
        'name': 'Louisiana',
        'abbreviation': 'LA'
      },
      {
        'name': 'Maine',
        'abbreviation': 'ME'
      },
      {
        'name': 'Marshall Islands',
        'abbreviation': 'MH'
      },
      {
        'name': 'Maryland',
        'abbreviation': 'MD'
      },
      {
        'name': 'Massachusetts',
        'abbreviation': 'MA'
      },
      {
        'name': 'Michigan',
        'abbreviation': 'MI'
      },
      {
        'name': 'Minnesota',
        'abbreviation': 'MN'
      },
      {
        'name': 'Mississippi',
        'abbreviation': 'MS'
      },
      {
        'name': 'Missouri',
        'abbreviation': 'MO'
      },
      {
        'name': 'Montana',
        'abbreviation': 'MT'
      },
      {
        'name': 'Nebraska',
        'abbreviation': 'NE'
      },
      {
        'name': 'Nevada',
        'abbreviation': 'NV'
      },
      {
        'name': 'New Hampshire',
        'abbreviation': 'NH'
      },
      {
        'name': 'New Jersey',
        'abbreviation': 'NJ'
      },
      {
        'name': 'New Mexico',
        'abbreviation': 'NM'
      },
      {
        'name': 'New York',
        'abbreviation': 'NY'
      },
      {
        'name': 'North Carolina',
        'abbreviation': 'NC'
      },
      {
        'name': 'North Dakota',
        'abbreviation': 'ND'
      },
      {
        'name': 'Northern Mariana Islands',
        'abbreviation': 'MP'
      },
      {
        'name': 'Ohio',
        'abbreviation': 'OH'
      },
      {
        'name': 'Oklahoma',
        'abbreviation': 'OK'
      },
      {
        'name': 'Oregon',
        'abbreviation': 'OR'
      },
      {
        'name': 'Palau',
        'abbreviation': 'PW'
      },
      {
        'name': 'Pennsylvania',
        'abbreviation': 'PA'
      },
      {
        'name': 'Puerto Rico',
        'abbreviation': 'PR'
      },
      {
        'name': 'Rhode Island',
        'abbreviation': 'RI'
      },
      {
        'name': 'South Carolina',
        'abbreviation': 'SC'
      },
      {
        'name': 'South Dakota',
        'abbreviation': 'SD'
      },
      {
        'name': 'Tennessee',
        'abbreviation': 'TN'
      },
      {
        'name': 'Texas',
        'abbreviation': 'TX'
      },
      {
        'name': 'Utah',
        'abbreviation': 'UT'
      },
      {
        'name': 'Vermont',
        'abbreviation': 'VT'
      },
      {
        'name': 'Virgin Islands',
        'abbreviation': 'VI'
      },
      {
        'name': 'Virginia',
        'abbreviation': 'VA'
      },
      {
        'name': 'Washington',
        'abbreviation': 'WA'
      },
      {
        'name': 'West Virginia',
        'abbreviation': 'WV'
      },
      {
        'name': 'Wisconsin',
        'abbreviation': 'WI'
      },
      {
        'name': 'Wyoming',
        'abbreviation': 'WY'
      }
    ];
  });
