import jwt from 'jsonwebtoken'

import fs from 'fs'


function authUser(req, res, next) {


  try {

    // verify jwt token
    let authToken = req.body.authToken

    let [userId, userPassword] = jwt.verify(authToken, global.JWT_SECRET)


    

    // get user
    let users = JSON.parse( fs.readFileSync('users.json', 'utf8') )
    let currentUser = users.find( user => user.userId == userId )


    // if user does not exist
    if (!currentUser) {
      throw new Error('No such user')
    
    // add check || if jwt would be stolen, psw change would help
    } else if (currentUser.userPassword != userPassword) {
      throw new Error('Invalid auth token')

    // if user is not verified
    } else if (currentUser.verified == false) {
      throw new Error('User is not verified')

    }


    // pass user to next middleware
    req.dataFromMiddleware.currentUser = currentUser




    next()
    

  } catch (error) {
    
    next(error)
  }


}


export default authUser