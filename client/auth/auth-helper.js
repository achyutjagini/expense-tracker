//In order to save the JWT credentials that are 
//received from the server on successful sign-in, 
//we use the authenticate method

import { signout } from './api-auth.js'

const auth = {
  isAuthenticated() {
    if (typeof window == "undefined")
      return false

    if (sessionStorage.getItem('jwt'))
      return JSON.parse(sessionStorage.getItem('jwt'))
    else
      return false
  },
  authenticate(jwt, cb) {
    if (typeof window !== "undefined")
      sessionStorage.setItem('jwt', JSON.stringify(jwt))
    cb()
  },
//A call to isAuthenticated() will return either the stored credentials or false, 
//depending on whether credentials were found in sessionStorage.
// Finding credentials in storage will mean a user is signed in, 
// whereas not finding credentials will mean the user is not signed in 


//When a user successfully signs out from the application,
// we want to clear the stored JWT credentials from sessionStorage.
// This can be accomplished by calling the clearJWT method

  clearJWT(cb) {
    if (typeof window !== "undefined")
      sessionStorage.removeItem('jwt')
    cb()
   
    signout().then((data) => {
      document.cookie = "t=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
    })
  }
}

export default auth
