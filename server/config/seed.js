/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import User from '../api/user/user.model';
import AdminPicture from '../api/adminPicture/adminPicture.model';

AdminPicture.find({}).remove()
  .then( () => {
    return AdminPicture.create({
      url:"https://drive.google.com/uc?id=0B-viYPCddrMLLTFramFTdmN5eTA",
      name: "aboutMe"
    });
  });

User.find({}).remove()
  .then(() => {
    User.create({
      provider: 'local',
      name: 'Test User',
      email: 'test@example.com',
      password: 'test'
    }, {
      provider: 'local',
      role: 'admin',
      name: 'Admin',
      email: 'admin@example.com',
      password: 'admin'
    })
    .then(() => {
      console.log('finished populating users');
    });
  });
