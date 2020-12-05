//contains definitions of the controller methods 
//that used in the preceding user route declarations 
//as callbacks to be executed when a route request is received by the server.

import User from '../models/user.model'
import extend from 'lodash/extend'
import errorHandler from './../helpers/dbErrorHandler'

const create = async (req, res) => {
  const user = new User(req.body)
  try {
    await user.save()
    return res.status(200).json({
      message: "Successfully signed up!"
    })
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

/**
 * Load user and append to req.
 */

//The userByID controller function uses the value in the :userId parameter
//to query the database by _id and load the matching user's details.

const userByID = async (req, res, next, id) => {
  try {
    let user = await User.findById(id)
    if (!user)
      return res.status('400').json({
        error: "User not found"
      })
//If a matching user is found in the database, the user object is appended to the request 
//object in the profile key. Then, the next() middleware is used to propagate control 
//to the next relevant controller function
      
    req.profile = user
    next()
  } catch (err) {
    return res.status('400').json({
      error: "Could not retrieve user"
    })
  }
}

//When the Express app gets a GET request at '/api/users/:userId',
//it executes the userByID controller function to load the user by the userId value,
// followed by the read controller function.


const read = (req, res) => {
  req.profile.hashed_password = undefined
  req.profile.salt = undefined
  return res.json(req.profile)
}

const list = async (req, res) => {
  try {
    let users = await User.find().select('name email updated created')
    res.json(users)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

//When the Express app gets a PUT request at '/api/users/:userId', 
//similar to read, it loads the user with the :userId parameter value 
//before executing the update controller function.

const update = async (req, res) => {
  try {
    let user = req.profile
    user = extend(user, req.body)
    user.updated = Date.now()
    await user.save()
    user.hashed_password = undefined
    user.salt = undefined
    res.json(user)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

//When the Express app gets a DELETE request at '/api/users/:userId', 
//similar to read and update, 
//it loads the user by ID and then the remove controller function is executed.

const remove = async (req, res) => {
  try {
    let user = req.profile
    let deletedUser = await user.remove()
    deletedUser.hashed_password = undefined
    deletedUser.salt = undefined
    res.json(deletedUser)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

export default {
  create,
  userByID,
  read,
  list,
  remove,
  update
}
