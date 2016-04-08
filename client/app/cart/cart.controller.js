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
      state: undefined,
      zip: undefined
    };


    $scope.card = {
      number: undefined,
      exp_month: undefined,
      exp_year: undefined,
      cvv: undefined
    };

    $scope.$watch('items', function(items) {
      if(items.length === 0) {
        toaster.pop("error", "There are no items in your cart.", "Add items to your cart from the store.");
        $state.go('store');
      }

      var total = 0;
      items.forEach(function(item) {

        total += item.Price * item.Quantity;
      });

      $scope.orderTotal = total;
    }, true);


    $scope.confirmRemoveItem = function(index) {
      $scope.currentItem = index;
      $scope.showDialog = true;
    };

    $scope.closeDialog = function() {
      $scope.currentItem = undefined;
      $scope.showDialog = false;
    };

    $scope.removeItem = function() {
      $scope.items.splice($scope.currentItem, 1);
      toaster.pop('success', 'Item removed from cart');

      $scope.orderTotal = 0;
      $scope.items.forEach(function(item) {
        $scope.orderTotal += item.Price;
      });

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
      storeService.validateAddress(addressObj).success(function(data) {
        if(data.object_state === "VALID") {
          $scope.checkingOut = true;

          $scope.shippingInfo.fullName = data.name;
          $scope.shippingInfo.address1 = data.street1;
          $scope.shippingInfo.address2 = data.street2;
          $scope.shippingInfo.city = data.city;
          $scope.shippingInfo.state = data.state;
          $scope.shippingInfo.zip = data.zip;
        } else {
          toaster.pop("error", "Invalid Address", data.messages[0].text);
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
        description: "Charge for " + $scope.currentUser.email
      };

      storeService.createCharge(stripeObj).then(function(data) {

        var emailString = "<head><style>#productsTable td { padding-left:5px; padding-right:5px;}</style></head>" +
          "<h3>Shipping Information</h3>" +
          "<table>" +
          "<tr>" +
          "<td style='text-align:right'>Full Name:</td>" +
          "<td style='width:5px'></td>" +
          "<td>" + $scope.shippingInfo.fullName +
          "</td>" +
          "</tr>" +
          "<tr>" +
          "<td style='text-align:right'>Address 1:</td>" +
          "<td style='width:5px'></td>" +
          "<td>" + $scope.shippingInfo.address1 +
          "</td>" +
          "</tr>";
          if($scope.shippingInfo.address2 !== undefined) {
            emailString += "<tr>" +
            "<td style='text-align:right'>Address 2:</td>" +
            "<td style='width:5px'></td>" +
            "<td>" + $scope.shippingInfo.address2 +
            "</td>" +
            "</tr>";
          }

          emailString += "<tr>" +
          "<td style='text-align:right'>City:</td>" +
          "<td style='width:5px'></td>" +
          "<td>" + $scope.shippingInfo.city +
          "</td>" +
          "</tr>" +
          "<tr>" +
          "<td style='text-align:right'>State:</td>" +
          "<td style='width:5px'></td>" +
          "<td>" + $scope.shippingInfo.state +
          "</td></tr>" +
          "<tr>" +
          "<td style='text-align:right'>Zip Code:</td>" +
          "<td style='width:5px'></td>" +
          "<td>" + $scope.shippingInfo.zip +
          "</td></tr>" +
          "</table><br />" +
          "<h3>Products Ordered</h3>" +
          "<table id='productsTable' border='solid 1px black'>" +
          "<thead>" +
          "<tr>" +
          "<td>Name</td>" +
          "<td>Price</td>" +
          "<td>Quantity Ordered</td>" +
          "</tr></thead>" +
          "<tbody style='border-top:solid 1px black'>";


        $scope.items.forEach(function(item) {
          emailString += "<tr>" +
            "<td>" + item.Name +
            "</td>" +
            "<td style='text-align:center;'>" + item.Price +
            "</td>" +
            "<td style='text-align:center;'>" + item.Quantity +
            "</td>" +
            "</tr>"
        });

        emailString += "</tbody></table>";

        //send a copy of email to jarmone and to the logged in user
        if(data.data.status === "succeeded") {
          var emailObj = {
            sendTo: ["fmgMerchandise@gmail.com", $scope.currentUser.email],
            subject: 'New Merchandise Order',
            emailBody: emailString
          };

          emailService.sendEmail(emailObj).then(function (email) {
            toaster.pop("success", "Order Placed.", "An email has been sent to confirm your order details.");
            $state.go('store');
          });
        } else {
          toaster.pop("error", "Payment Error!", data.data.message);
        }
      });
    }


  });
