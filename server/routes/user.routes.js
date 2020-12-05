//The API endpoint to create a new user

//When the Express app gets a POST request at '/api/users', it calls the create
//function defined in the controller.

import express from 'express'
import userCtrl from '../controllers/user.controller'
import authCtrl from '../controllers/auth.controller'

const router = express.Router()
//Listing users with GET
//Creating a new user with POST

router.route('/api/users')
  .get(userCtrl.list)
  .post(userCtrl.create)

 // Fetching a user with GET
 // Updating a user with PUT 
 //Deleting a user with DELETE
  
router.route('/api/users/:userId')
  .get(authCtrl.requireSignin, userCtrl.read)
  .put(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.update)
  .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.remove)

router.param('userId', userCtrl.userByID)

export default router
