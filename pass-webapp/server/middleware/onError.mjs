
function onError(error, req, res) {
  

  let objToSend = {
    'isSuccess': false,
    'error': error
  }

  res.send( JSON.stringify(objToSend) )

}


export default onError