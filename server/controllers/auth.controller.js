
//The auth controller functions in server/controllers/auth.controller.js 
//will not only handle requests to the signin and signout routes, but also provide JWT 
//and express-jwt functionality to enable authentication and authorization
// for protected user API endpoints.


import User from '../models/user.model'
import jwt from 'jsonwebtoken'
import expressJwt from 'express-jwt'
import config from './../../config/config'

const signin = async (req, res) => {
  try {
    let user = await User.findOne({
      "email": req.body.email
    })
    if (!user)
      return res.status('401').json({
        error: "User not found"
      })

    if (!user.authenticate(req.body.password)) {
      return res.status('401').send({
        error: "Email and password don't match."
      })
    }

    const token = jwt.sign({
      _id: user._id
    }, config.jwtSecret)

    res.cookie("t", token, {
      expire: new Date() + 9999
    })

    return res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email
      }
    })

  } catch (err) {

    return res.status('401').json({
      error: "Could not sign in"
    })

  }
}

const signout = (req, res) => {
  res.clearCookie("t")
  return res.status('200').json({
    message: "signed out"
  })
}


//The requireSignin method in auth.controller.js uses express-jwt to 
//verify that the incoming request has a valid JWT in the Authorization header.
// If the token is valid, it appends the verified user's ID in an 
//'auth' key to the request object; otherwise, it throws an authentication error

const requireSignin = expressJwt({
  secret: config.jwtSecret,
  userProperty: 'auth'
})

// the hasAuthorization function defined in auth.controller.js will check 
//whether the authenticated user is the same as the user being updated 
//or deleted before the corresponding CRUD controller function 
//is allowed to proceed.

const hasAuthorization = (req, res, next) => {
  const authorized = req.profile && req.auth && req.profile._id == req.auth._id
  if (!(authorized)) {
    return res.status('403').json({
      error: "User is not authorized"
    })
  }
  next()
}

export default {
  signin,
  signout,
  requireSignin,
  hasAuthorization
}
