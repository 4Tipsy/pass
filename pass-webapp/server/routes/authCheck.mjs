

function authCheck(req, res) {

  let currentUser = req.dataFromMiddleWare.currentUser


  let objToSend = {
    'isSuccess': true,
    'currentUser': currentUser
  }

  res.send( JSON.stringify(objToSend) )

}


export default authCheck