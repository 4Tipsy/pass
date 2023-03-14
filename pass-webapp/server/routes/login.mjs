import fs from 'fs'



function login(req, res, next) {
  
  try {
    
    let {userName, userPassword} = req.body.loginData


    // find such user
    let users = JSON.parse( fs.readFileSync('users.json', 'utf8') )
    let userToLogIn = users.find( user => user.userName == userName )


    // check the user
    if ( !userToLogIn ) {
      throw new Error('No such user')

    } else if ( userToLogIn.userPassword != userPassword ) {
      throw new Error('Wrong password')

    }


    // JWT sign
    const authToken = jwt.sign(
      {'userId': userToLogIn.userId, 'userPassword': userToLogIn.userPassword},
    global.JWT_SECRET)




    let objToSend = {
      'isSuccess': true,
      'authToken': authToken
    }
  
    res.send( JSON.stringify(objToSend) )



  } catch (error) {
    
    next(error)

  }

}



export default login