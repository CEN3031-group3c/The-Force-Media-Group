'use strict';

angular.module('fmgApp')
  .service('email', function () {
    var nodemailer = require("nodemailer");

    var smtpTransport = nodemailer.createTransport("SMTP",{
      service: "Gmail",
      auth: {
       user: "forcemediagroupdb@gmail.com",
       pass: "n6ab$-Q&8*@x"
     }
    });
    smtpTransport.sendMail({
      from: "My Name <me@example.com>", // sender address
      to: "Your Name <you@example.com>", // comma separated list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world ✔" // plaintext body
    }, function(error, response){
      if(error){
       console.log(error);
     }else{
       console.log("Message sent: " + response.message);
     }
   });
  });
