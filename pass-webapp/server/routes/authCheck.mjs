

function authCheck(req, res) {

  let currentUser = req.dataFromMiddleware.currentUser


  let objToSend = {
    'isSuccess': true,
    'currentUser': currentUser.userName
  }

  res.send( JSON.stringify(objToSend) )

}


export default authCheck